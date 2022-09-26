console.log("地图接口使用 [高德] ，天气接口使用 [和风天气] 。\n" +
    "您可以点击 [🔄更新天气] 按钮获取最新数据，也可以点击右下角的 [🌓] 按钮进行模式切换。")

// 这样时间会在第一秒时不显示 但简洁一点
setInterval(() => {
    let a = new Date()
    let time = a.toLocaleTimeString()
    let date = a.toLocaleDateString()
    document.getElementById("currentTime").innerHTML = `${date} ${time}`
}, 1000)

// 定位 + 地图 移动端可能因为权限问题无法授权定位，所以先默认钱塘
let locationNow = "101210111"
let map = new AMap.Map('container', {
    resizeEnable: true
})
AMap.plugin('AMap.Geolocation', function () {
    let geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,// 高精度定位
        timeout: 10000,          // 超过10秒后停止定位
        buttonPosition: 'RB',    // 按钮停靠位置
        buttonOffset: new AMap.Pixel(10, 20),
        zoomToAccuracy: true,    // 定位成功后调整地图视野

    })
    map.addControl(geolocation)
    geolocation.getCurrentPosition(function (status, geoResult) {
        // 调试时输出
        if (status == 'complete') {
            onComplete(geoResult)
        } else {
            onError(geoResult)
        }
    })
})

// 解析定位结果，调试时输出
function onComplete(data) {
    document.getElementById('status').innerHTML = '定位成功'
    let str = []
    str.push('定位结果：' + data.position)
    locationNow = data.position
    str.push('定位类别：' + data.location_type)
    if (data.accuracy) {
        str.push('精度：' + data.accuracy + ' 米')
    }
    str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'))
    document.getElementById('geoResult').innerHTML = str.join('<br>')
}

// 报错信息，调试时输出
function onError(data) {
    document.getElementById('status').innerHTML = '定位失败'
    document.getElementById('geoResult').innerHTML = '失败原因排查信息:' + data.message
    document.getElementById("modal").style.display = "block"
}

// 图表绘制
function callEcharts(max1, max2, max3, min1, min2, min3) {
    let myChart = echarts.init(document.getElementById('chart'))
    let option = {
        grid: {
            x: 30,
            y: 35,
            x2: 20,
            y2: 25,
            borderWidth: 1
        },
        title: {
            text: ' 气温走向',
        },
        xAxis: {
            data: ['今天', '明天', '后天',],
        },
        yAxis: {
            scale: true,
        },
        legend: {
            data: ['最高温度', '最低温度']
        },
        series: [
            {
                name: '最高温度',
                type: 'line',
                data: [max1, max2, max3],
                label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        fontSize: 16
                    }
                },
            },
            {
                name: '最低温度',
                type: 'line',
                data: [min1, min2, min3],
                label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        fontSize: 12
                    }
                },
                lineStyle: {
                    normal: {
                        color: 'green',
                        type: 'dashed'
                    }
                },
            }
        ]
    }

    myChart.setOption(option)

    // echarts的图表只绘制一次，需要在更改窗口大小后重新绘制
    window.onresize = function () {
        myChart.resize()
    }
}

// 渲染页面
function render() {
    // 数据请求
    Promise.all([axios.get(`https://devapi.qweather.com/v7/weather/3d?location=${locationNow}&key=2175cc3e56c3447bb9476001f1513df0`),
        axios.get(`https://devapi.qweather.com/v7/weather/now?location=${locationNow}&key=2175cc3e56c3447bb9476001f1513df0`),
        axios.get(`https://geoapi.qweather.com/v2/city/lookup?location=${locationNow}&key=2175cc3e56c3447bb9476001f1513df0`),
        axios.get(`https://devapi.qweather.com/v7/indices/1d?type=3,8&location=${locationNow}&key=2175cc3e56c3447bb9476001f1513df0`)])
        .then((response) => {

            // 对象解构
            let {data: resWeather} = response[1]
            let {now: {icon, text, temp, feelsLike}} = resWeather

            let {data: {location: resGeo}} = response[2]
            let [{adm1, adm2, name}] = resGeo

            let {data: {daily: resFeel}} = response[3]
            let [{text: closeText}, {text: feelText}] = resFeel

            let {data: {daily: res}} = response[0]
            let [{
                tempMax: max1,
                tempMin: min1,
                windDirDay: windDir1,
                windScaleDay: windScale1,
                vis: vis1,
                humidity: humidity1
            },
                {
                    tempMax: max2,
                    tempMin: min2,
                    fxDate: date2,
                    iconDay: icon2,
                    textDay: textDay2,
                    windDirDay: windDir2,
                    windScaleDay: windScale2
                },
                {
                    tempMax: max3,
                    tempMin: min3,
                    fxDate: date3,
                    iconDay: icon3,
                    textDay: textDay3,
                    windDirDay: windDir3,
                    windScaleDay: windScale3
                }] = res

            document.getElementById("statusNow").innerHTML = `<i class="qi-${icon}"></i>\n ${text} ${temp} ℃`
            document.getElementById("feelLike").innerText = `体感温度 ${feelsLike} ℃`
            document.getElementById("location").innerText = `📍\xa0\xa0${adm1} ${adm2} ${name}`

            document.getElementById("maxTemp").innerText = `🔼\xa0\xa0${max1} ℃`
            document.getElementById("minTemp").innerText = `🔽\xa0\xa0${min1} ℃`
            document.getElementById("now.windDir").innerText = windDir1
            document.getElementById("now.windScale").innerText = `${windScale1}\xa0\xa0级`
            document.getElementById("now.vis").innerText = `能见度\n ${vis1} km`
            document.getElementById("now.humidity").innerText = `湿度\n ${humidity1} %`

            document.querySelector("#tomorrow > span.fxDate").innerText = date2
            document.querySelector("#tomorrow > span.iconDay").innerHTML = `<i class="qi-${icon2}"></i>\n ${textDay2}`
            document.querySelector("#tomorrow > span.tempMax").innerText = `🔼\xa0\xa0${max2} ℃\xa0\xa0\xa0🔽\xa0\xa0${min2} ℃`
            document.querySelector("#tomorrow > span.tempMin").innerText = `${windDir2}\xa0\xa0\xa0${windScale2} 级`

            document.querySelector("#twoDays > span.fxDate").innerText = date3
            document.querySelector("#twoDays > span.iconDay").innerHTML = `<i class="qi-${icon3}"></i>\n ${textDay3}`
            document.querySelector("#twoDays > span.tempMax").innerText = `🔼\xa0\xa0${max3} ℃\xa0\xa0\xa0🔽\xa0\xa0${min3} ℃`
            document.querySelector("#twoDays > span.tempMin").innerText = `${windDir3}\xa0\xa0\xa0${windScale3} 级`

            document.querySelector("#statusNow").setAttribute('title', closeText)
            document.querySelector("#feelLike").setAttribute('title', feelText)

            // 调用图表绘制函数
            callEcharts(max1, max2, max3, min1, min2, min3)

        })
        .catch((err) => {
            console.log("请求失败，Api 接口请求次数已达今日上限")
            // 弹出错误信息
            // document.getElementById("modal").style.display = "block"
        })
}

render()

window.addEventListener("click", () => {
    document.getElementById("modal").style.display = "none"
    // 重新发送请求
    render()
})

// 暗色模式适配
function addDarkmodeWidget() {
    const darkmode = new Darkmode({
        label: '🌓', // default: ''
    });
    darkmode.showWidget();
    new Darkmode().showWidget();
}

window.addEventListener('load', addDarkmodeWidget);





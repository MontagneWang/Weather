## 山遥路远_'s 天气站   

### 总览   

[山遥路远_'s 天气站](https://weather.乐正绫.cn "点击将前往演示站")，欢迎光临~   
![](https://i0.hdslb.com/bfs/album/5df1175d6ee775e1ef8a9c4482ad1ca7295fb99d.png)   

#### 写在前面的话  
  
二面任务，虽然截止时间是国庆结束，但我不是很喜欢把任务拖着慢慢完成。
而且下周与国庆还有其他比较重要的事情要做，所以就直接在这个周末写了。
之前做过一个类似的组件，思路和方法都大同小异，这次做起来就比较快了。
以下是报告文档与使用说明

#### 完成状况
- [x] 实时天气
   - [x] 显示当前的基本信息，如城市地区、时间
   - [x] 显示当前的气温和天气现象状态
   - [x] 制作一个相关信息卡片，显示当前风向、湿度等数据
   - [x] 增加 Icon 和图表
- [x] 天气预报
   - [x] 通过列表显示未来几天天气数据，如温度、风向等
   - [x] 未来天气可以通过折线图直观表示
- [ ] 额外发挥
   - [x] 根据你的数据源，可以展示更多的天气数据，如穿衣建议、舒适度等
   - [x] 增加定位功能，通过简单的地图展示当前位置
   - [ ] 容器查询 (Container Queries) 、CSS Layout API
- [ ] 用户体验
   - [x] 自适应布局
   - [x] 暗黑模式
   - [ ] 骨架屏、多语言切换 (i18N)


### Api 接口

由于之前已经申请过了 和风天气 与 高德 的 Api ，所以本次任务使用 和风天气 的接口来获取天气数据，使用 高德 的接口来显示地图。

### 数据请求与渲染

使用 Promise.all 方法发起多个 Axios 请求，然后对返回的数据对象解构，再进行页面渲染。
![](https://i0.hdslb.com/bfs/album/4d7539eae910012e7ecbc0fc971ec2a69433636b.png)

穿衣提示和舒适度是放在了主天气的 title 属性里，这样 hover 时可以看到提示。
![](https://i0.hdslb.com/bfs/album/94fcca986c836e3411d5591741215a3a9a1fde34.png)
<img src="https://i0.hdslb.com/bfs/album/5d97662ff8c9d5afedfbd89fb3ee053257154e86.png" style="zoom: 80%;" />

### 布局与适配

以 Flex 布局为主，本来打算使用 Rem + flexible.js 重写一个移动端的页面，但想了想还是改成了多写几个媒体查询。~~做了个伪响应式~~

#### 不同尺寸的适配
![](https://i0.hdslb.com/bfs/album/5df1175d6ee775e1ef8a9c4482ad1ca7295fb99d.png)
![](https://i0.hdslb.com/bfs/album/1b98eb22d651ed99e47ce709a713f9b2ff8f5fbc.png)
![](https://i0.hdslb.com/bfs/album/23283438c73db66d30cc3a49c63e377fd1eb1a7a.png)


#### 暗色模式的适配
![使用的是 darkmode.js ](https://i0.hdslb.com/bfs/album/42d314409ec748f2a7f06c2b55bbbf73a334220a.png)

搜索了一下，i18N 与骨架屏的便捷解决方法好像基本上都在 Vue 与 React 框架里，之后学到了再补上。

### 图表展示
使用 Echarts 展示图表，由于其只绘制一次，所以在缩放窗口时无法跟随父容器大小动态变化，因此使用 window.onresize 监视窗口变化，并重新绘制图表。

![一个简单的图表，使用的是 Echarts.js ](https://i0.hdslb.com/bfs/album/2d0608d8648160938105bfe3025f4ef52850c329.png)
![也可以只显示一条折线图](https://i0.hdslb.com/bfs/album/3278b2777e8f0b2805358e3967afd470aed3ab4c.png)

### 注意事项
移动端上可能由于权限设置导致无法浏览器无法定位，所以地区先默认定位在了杭州。
![ 一个错误弹窗，Promise 对象返回 rejected 时触发。一种可能是没有定位权限，还有一种是 Api 的请求次数到达上限](https://i0.hdslb.com/bfs/album/fa3d94b5d372a96b33149e3837e7d127e11838e3.png)

### 结语
尝试了一些以前没用过的，比如 vw/vh 布局。（但由于不太熟练最后又换回 Flex 布局了hhh）

说起来，过渡动画什么的交互内容完全没做呢（主要我也想不出来能添加什么交互动画……）
大概十月后能把这学期要做的事情都解决了，到时候再补充一点吧。
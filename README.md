## 山遥路远_'s 天气站

<img src="https://cdn1.tianli0.top/gh/MontagneWang/picodemo/img/202208261058503.jpg" alt="cover"  />

#### 总览

[山遥路远_'s 天气站](https://乐正绫.cn/weather "点击将前往演示站")，欢迎光临~



##### 写在前面的话
一个小任务，虽然截止时间时国庆结束，但我不是很喜欢把任务拖着慢慢完成
而且国庆的时候还有其他一些重要的事情要做，所以就直接在这个周末写了
以下是报告文档与使用说明



\- [ ]  为项目应用漂亮优雅的UX（印象分++）
 \- [ ]  对项目进行适配，如不同设备屏幕尺寸**自适应布局** / **暗黑模式** / **多语言切换**（i18N）
 \- [ ]  如果涉及与后端的交互，数据加载过程中需要给用户足够的提示，如 **骨架屏** 或 **进度条加载动画** ；加载数据失败时，可以通过 **Toast（轻提示）** 等方式给予用户提示

\- [ ] 实时天气
   \- [x] 显示当前的基本信息，如::城市地区::、::时间::
   \- [x] 显示当前的::气温::和::天气现象状态::
   \- [x] 制作一个相关信息卡片，显示::风向::、::湿度::等
   \- [x] 美观即可，可以::增加 icon 和图表::
   \- [ ] 加一个背景图
 \- [x] 天气预报
   \- [x] 通过列表显示未来天气数据，如温度、风向
   \- [x] 未来天气可以通过折线图直观表示

 额外发挥
 \- [x] 根据你的数据源，可以展示更多的天气数据，如穿衣建议、舒适度等（hover时显示）
 \- [x] 增加定位功能，可以使用原生 Geolocation API 或其他方式，可以通过简单的地图（借助各种地图库）展示当前位置
 \- [ ] 如有需要，不妨试试前沿的浏览器特性，只要是能够在最新版 Chrome Canary 通过 flags 开启的特性均可使用，如容器查询(Container Queries)、CSS Layout API。



###### 已实现

定位 + 天气数据 + 图表

暗色模式 + 移动端适配

###### 待实现

外观 + 交互优化



#### Api 接口

由于之前已经申请过了 高德 与 和风天气 的 Api :

所以本次任务使用 高德 的接口来显示地图；

使用 和风天气 的接口来获取天气数据。



#### 数据请求与渲染

使用 Axios 进行数据请求

使用 Promise.all 方法发起多个 Axios 请求，然后再解构

封装一个渲染函数

hover 时显示穿衣提示和舒适度

#### 布局与适配

以 Flex 布局为主



##### 移动端适配

本来打算使用 Rem + flexible.js 重写一个移动端的页面，

但想了想还是改成了多写几个媒体查询~~，做了个伪响应式~~



##### 暗色模式

使用了 Darkmode.js 实现暗色模式。



##### 图表展示

使用了 Echarts ，由于其只绘制一次，所以在缩放窗口时无法跟随父容器大小动态变化，因此使用 window.onresize 监视窗口变化，并重新绘制图表。


##### 注意
移动端可能由于权限设置的原因导致无法授权浏览器定位，所以地区


#### 结语

尝试了一些以前没用过的，比如 less 和 vw/vh 布局<span class="heimu">（虽然说最后又换回 Flex 布局了hhh）</span>

#### 

less 很久以前就学了，但之前都只是在对博客进行修补，所以一直没能用上。这次刚好是从头构建，所以就直接使用 less 了。



说起来，过渡动画什么的交互内容完全没做呢

可以参考博客的侧边栏，里面的过渡与动画基本是自己重写过的

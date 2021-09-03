### 前端渲染方案
Performance API中的指标逐步演进成用户性能体验相关的指标。

![An image](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/6/2/1727325523bb7f04~tplv-t2oaga2asx-watermark.awebp)
![Image from alias](~src/public/imgs/performance.png)

<https://w3c.github.io/navigation-timing/>  
<https://w3c.github.io/paint-timing/> 


### 渲染方案的发展史
![An image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7674750825104276873e58256e47d531~tplv-k3u1fbpfcp-watermark.awebp)

### 前SSR(Server Side Rendering) 服务端渲染

![An image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/29173361da334af7b164eb4037c774d7~tplv-k3u1fbpfcp-watermark.awebp)

最早期的前端渲染（2005年Ajax推出之前）都是和后端混写的，比如JSP、PHP等写法。但是前后端写法杂糅在一起导致开发效率低下，比如改个样式还要重新编译一遍，并且页面也会写的很重。  

example: fmlist聚合页  
缺点：
1. 前后端代码混合，模版引擎和js代码混合, 代码维护麻烦

优点:
1. seo友好
2. 白屏时间较长，首屏时间和tti比较好

<font color=red>问： 如何进行前后端代码分离？</font>


### CSR(Client Side Render) 客户端渲染
后面有了Ajax技术之后，再加上通过CDN缓存静态资源之后，前端SPA + CSR渲染有了飞跃式的发展，这种模式前端处理所有逻辑、内容填充和路由，数据加载部分通过Ajax从后端获取，因此很好的解决了前后端分工开发的问题。其具体请求时间线可参见下图。

![An image](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/50002bf37f9345c787881ae4ce4578ad~tplv-k3u1fbpfcp-watermark.awebp)

```html
<html>
  <head>
    <link href="//file.baixing.net/bax-fe/static/7.151cee767e5ee8068b48.css" rel="stylesheet">
    <link href="//file.baixing.net/bax-fe/static/bax.151cee767e5ee8068b48.css" rel="stylesheet">
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <script src="//file.baixing.net/bax-fe/static/vendors~authorizationPage~bax~huodong~signin.93d084cf72d85fb8b6.js"></script>
    <script src="//file.baixing.net/bax-fe/static/vendors~authorizationPage~bax~signin.10765686422e9bb3f6.js"></script>
  </body>
</html>
```
example： bax-fe  

缺点
1. seo不友好, 首次返回的只有html信息，在根据ajax动态获取数据
2. 首屏以及TTI都较长

优点
1. 前后端代码分离，利于高效开发

<font color=red>问： 如何首次返回完整的html，又能前后端分离？ </font>

### 后SSR(Server Side Rendering) 服务端渲染

再后来随着Node引领的全栈技术的发展，前端又回到了当初的SSR路上，只不过这次的回归是一次螺旋式的上升。首先是前后端全是JS语法，大部分代码都是可复用的，其次是SEO场景友好，服务端渲染好后直接返回最终的HTML，减少了白屏等待时间，过多异步请求的导致的性能问题也可下放到服务端解决，也能有效避免多次的数据获取、内容填充，浏览器只绑定相关的JS逻辑、事件即可。其具体请求时间线可参见下图。

![An image](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/739ba6c4261c4edebcce4fb76f3f3583~tplv-k3u1fbpfcp-watermark.awebp)
![An image](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/28/1725accbf21fd47c~tplv-t2oaga2asx-watermark.awebp)

example: 官网 

缺点:
1. 对前端开发有更高的要求
2. 对服务端的负载要求比较高
3. SSR距离用户较远，带来的白屏时间较长（FP）

优点
1. seo友好
2. 首屏时间和TTI比较好
3. 前后端分离

<font color=red>问： 如何减少服务端压力，又能保证seo友好以及首屏渲染相对较快</font>

### ESR（Edge Side Rendering）边缘渲染

后面随着边缘计算的发展，由于CDN节点距离用户更近，有更短网络延时的优势，我们可以将页面进行动静拆分，将静态内容缓存在CDN先快速返回给用户，然后在CDN节点上发起动态内容的请求，之后将动态内容与静态部分以流的形式进行拼接，从而进一步提高了用户的首屏加载时间，尤其在边缘地区或者弱网环境也有能拥有很好的用户体验，此外还减少原先SSR服务器压力。
![An image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/020b10fdb4f24ba7997001e790501f2f~tplv-k3u1fbpfcp-watermark.awebp)  

流式：将页面拆分成独立的几部分模块，每个模块有单独的数据源和单独的页面模板，在server端流式的操作每个模块进行业务逻辑处理和页面模板的渲染，然后流式的将渲染出来的HTML输出到网络中，接着分块的HTML数据在网络中传输，接着流式的分块的HTML在浏览器逐个渲染展示。

CDN边缘计算(EdgeRoutine)的能力: 可以在 CDN 请求返回结果之前加上你的自定义脚本，并且可以访问 CDN 的数据，那就意味着我们可以控制 CDN 请求返回的内容或者HTTP 状态

缺点：
1. 接入成本比较大的，例如要注意 ER 容器本身的各种限制、调试成本、云资源申请成本等。

优点：
1. seo友好
2. 白屏、首屏、TTI较好
3. 前后端分离


### NSR（Native Side Rendering）
首先加载离线页面模板，通过Ajax预加载页面数据，通过Native渲染生成Html数据并且缓存在客户端。
NSR本质是分布式SSR，将服务器的渲染工作放在了一个个独立的移动设备中，实现了页面的预加载，同时又不会增加额外的服务器压力
![An image](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/6/2/1727327dfc1aa57f~tplv-t2oaga2asx-watermark.awebp)



### 总结
CSR、SSR、NSR、ESR，前端渲染方案如此纷繁复杂，其实每一种渲染方案都有其优势和劣势，一定要结合自身的业务需求，平衡好收益和成本选择适合自己的方案。










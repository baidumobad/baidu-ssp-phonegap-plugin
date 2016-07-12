百度ssp移动联盟phonegap插件
====================

百度联盟phonegap(cordova)插件，能很方便的在html5 hybrid应用（如cordova，xdk，appcan，webx5，jqmobile、sencha touch,ionic）中接入百度ssp联盟广告，支持ios和android平台。<br/>
基于phonegap 3.4 或 cordova 5编译

### 怎么在html5应用中加入百度ssp移动联盟广告呢?可以使用cordova命令行远程或者本地方式安装本百度移动广告插件
在命令行中输入<br/>
```
cordova plugin add https://github.com/baidumobad/baidu-ssp-phonegap-plugin.git
```
或者把插件下载到本地解压后输入命令
<br/>
```
cordova plugin add c:\baidu-ssp-phonegap-plugin
```
### 在phonegap 类的html5应用中展示百度移动广告横幅类型广告
测试前把appID和bannerID替换为你在百度ssp申请到的真实的参数,    
如下例子中0是y方向上偏移，bannername是横幅的名称，如果要一个界面显示多个，传入不同名称就会创建不同的横幅
```
baiduAd.showBanner(baiduAd.AD_POSITION.BOTTOM_CENTER,0,"app id", "banner id","bannerName");//用相对位置的方式展示广告，具体的相对位置的值AD_POSITION中

```
### 在phonegap类型的html5应用中展示百度ssp移动联盟插屏广告：
在cordova应用中展示百度mob全屏插屏广告
```
 function onInterstitialReceive(message) {
     baiduAd.showInterstitial();//加载完成后展示广告
 }
  document.addEventListener('onInterstitialReceive', onInterstitialReceive, false);//监听广告加载成功事件
  baiduAd.cacheInterstitial("app id", "interstitial id");//请求加载插屏广告
```

### 百度移动联盟ssp广告事件的处理
监听处理广告中的事件，例如监听广告接收成功事件
例子参考上面展示全屏广告，事件类型定义在AdEvent中

### 更多接口
通过绝对定位的方式展示banner广告<br/>
baiduAd.showBannerAbsolute(x,y,"app id", "banner id","bannerName2");<br/>
隐藏banner广告<br/>
hideBanner()<br/>
判断全屏广告是否已经加载完成<br/>
isInterstitialReady( successCallback, failureCallback) <br/>

接口的完整使用方式参考demo下代码<br/>

百度ssp移动广告phonegap插件官方网址:https://github.com/baidumobad/baidu-ssp-phonegap-plugin<br/>
百度ssp移动广告官方网站http://ssp.baidu.com<br/>
phonegap app开发者交流群 475496285<br/>
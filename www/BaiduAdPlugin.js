var baiduAd = {
	 AD_POSITION: {
	     TOP_LEFT:int=1,
		 TOP_CENTER:int=2,
		 TOP_RIGHT:int=3,
		 MIDDLE_LEFT:int=4,
		 MIDDLE_CENTER:int=5,
		 MIDDLE_RIGHT:int=6,
		 BOTTOM_LEFT:int=7,
		 BOTTOM_CENTER:int=8,
		 BOTTOM_RIGHT:int=9
    },
    AD_SIZE: {
        BANNER: "BANNER",
        IAB_MRECT: "IAB_MRECT",
        IAB_BANNER: "IAB_BANNER",
        IAB_LEADERBOARD: "IAB_LEADERBOARD",
        SMART_BANNER: "SMART_BANNER"
    },
    AdEvent: {
        onBannerDismiss:"onBannerDismiss",
        onBannerFailedReceive:"onBannerFailedReceive",
        onBannerLeaveApplication:"onBannerLeaveApplication",
        onBannerPresent:"onBannerPresent",
        onBannerReceive:"onBannerReceive",
        onInterstitialDismiss:"onInterstitialDismiss",
        onInterstitialFailedReceive:"onInterstitialFailedReceive",
        onInterstitialLeaveApplication:"onInterstitialLeaveApplication",
        onInterstitialPresent:"onInterstitialPresent",
        onInterstitialReceive:"onInterstitialReceive",
        onSplashPresent:"onSplashPresent",
        onSplashFailed:"onSplashFailed",
        onSplashDismissed:"onSplashDismissed",
        onSplashClick:"onSplashClick"
    },
    FunNames:{
        hideBanner:"baiduHideBanner",
        showBannerAbsolute:"baiduShowBannerAbsolute",
        showBanner:"baiduShowBanner",
        initBanner:"baiduShowSplash",
        isInterstitialReady:"baiduIsInterstitialReady",
        showInterstitial:"baiduShowInterstitial",
        cacheInterstitial:"baiduCacheInterstitial",
        disposePlugin : "disposePlugin"
    },
	    hideBanner: function (bannerName, successCallback, failureCallback) {
        cordova.exec(
            successCallback,
            failureCallback,
            'BaiduAdPlugin',
            'baiduHideBanner',
            [
            bannerName
            ]
        );
    },
    showBannerAbsolute: function (x,y,appID,bannerID,bannerName, successCallback, failureCallback) {
        cordova.exec(
            successCallback,
            failureCallback,
            'BaiduAdPlugin',
            'baiduShowBannerAbsolute',
            [
    {x:x,y:y,bannerName:bannerName,appID:appID,bannerID:bannerID}
            ]
        );
    },
    showBanner: function (position,marginY,appID,bannerID,bannerName, successCallback, failureCallback) {
        cordova.exec(
            successCallback,
            failureCallback,
            'BaiduAdPlugin',
            'baiduShowBanner',
            [
    {position:position,marginY:marginY,appID:appID,bannerID:bannerID,bannerName:bannerName}
            ]
        );
    },
    
   

    isInterstitialReady: function ( successCallback, failureCallback) {
        cordova.exec(
            successCallback,
            failureCallback,
            'BaiduAdPlugin',
            'baiduIsInterstitialReady',
            [

            ]
        );
    },

    showInterstitial: function (successCallback, failureCallback) {
        cordova.exec(
            successCallback,
            failureCallback,
            'BaiduAdPlugin',
            'baiduShowInterstitial',
            [

            ]
        );
    },

    cacheInterstitial: function (appID,interstitialID,successCallback, failureCallback) {
        cordova.exec(
            successCallback,
            failureCallback,
            'BaiduAdPlugin',
            'baiduCacheInterstitial',
            [
	{appID:appID,interstitialID:interstitialID}
            ]
        );
    },
    showSplash: function (appID,splashID,successCallback, failureCallback) {
        cordova.exec(
            successCallback,
            failureCallback,
            'BaiduAdPlugin',
            'baiduShowSplash',
            [
	{appID:appID,splashID:splashID}
            ]
        );
    },

    disposePlugin: function (successCallback, failureCallback) {
        cordova.exec(
            successCallback,
            failureCallback,
            'BaiduAdPlugin',
            'disposePlugin', [
                
            ]);
    }
};
module.exports = baiduAd;

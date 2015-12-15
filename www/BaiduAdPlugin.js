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
        onInterstitialReceive:"onInterstitialReceive"
    },
    FunNames:{
        hideBanner:"baiduHideBanner",
        showBannerAbsolute:"baiduShowBannerAbsolute",
        showBanner:"baiduShowBanner",
        initBanner:"baiduInitBanner",
        initInterstitial:"baiduInitInterstitial",
        isInterstitialReady:"baiduIsInterstitialReady",
        showInterstitial:"baiduShowInterstitial",
        cacheInterstitial:"baiduCacheInterstitial",
        disposePlugin : "disposePlugin"
    },
    hideBanner: function ( successCallback, failureCallback) {
        cordova.exec(
            successCallback,
            failureCallback,
            'BaiduAdPlugin',
            'baiduHideBanner',
            [
            ]
        );
    },
    showBannerAbsolute: function (x,y, successCallback, failureCallback) {
        cordova.exec(
            successCallback,
            failureCallback,
            'BaiduAdPlugin',
            'baiduShowBannerAbsolute',
            [
                {x:x,y:y}
            ]
        );
    },
    showBanner: function (position, successCallback, failureCallback) {
        cordova.exec(
            successCallback,
            failureCallback,
            'BaiduAdPlugin',
            'baiduShowBanner',
            [
                position
            ]
        );
    },
    initBanner: function (appID,bannerID, successCallback, failureCallback) {
        cordova.exec(
            successCallback,
            failureCallback,
            'BaiduAdPlugin',
            'baiduInitBanner',
            [
    {'appID': appID, 'bannerID':bannerID}
            ]
        );
    },
    initInterstitial: function (appID,fullID, successCallback, failureCallback) {
        cordova.exec(
            successCallback,
            failureCallback,
            'BaiduAdPlugin',
            'baiduInitInterstitial',
            [
    {'appID':appID,'fullID':fullID}
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

    cacheInterstitial: function (successCallback, failureCallback) {
        cordova.exec(
            successCallback,
            failureCallback,
            'BaiduAdPlugin',
            'baiduCacheInterstitial',
            [

            ]
        );
    },

    disposePlugin: function (successCallback, failureCallback) {
        cordova.exec(
            successCallback,
            failureCallback,
            'BaiduAdPlugin',
            'disposePlugin', [
                {}
            ]);
    }
};
module.exports = baiduAd;

/**
 * @file 开屏模版的bridge
 */
(function () {
    window.baidu = {};
    window.baidu.mobads = {};
    window.baidu.mobads.Sdk = {
        isIOS: false
    };
    var Sdk = window.baidu.mobads.Sdk;
    Sdk.isIOS = (/iphone|ipad|ipod/i).test(window.navigator.userAgent.toLowerCase());

    var mob = window.baidu.mobads;
    mob.Act = {
        LP: 1,
        DL: 2,
        MAP: 4,
        SMS: 8,
        MAIL: 16,
        PHONE: 32,
        VIDEO: 64,
        RM: 128,
        // 全屏富媒体，@modified by liaobinbin01
        NA: 256,
        // 空
        APO: 512 // app唤醒
    };

    window.MobadsSdk = {
        /**************************************************************************
         * cmd instance example
         * var cmd = { 'class': 'NSLog', 'method': 'log', arguments: []}
         **************************************************************************/
        commandQueue: []

    };

    var MobadsSdk = window.MobadsSdk;

    MobadsSdk._createBridge = function () {
        var adsBridge = document.createElement('iframe');
        adsBridge.setAttribute('style', 'display:none;');
        adsBridge.setAttribute('height', '0px');
        adsBridge.setAttribute('width', '0px');
        adsBridge.setAttribute('frameborder', '0');
        document.documentElement.appendChild(adsBridge);
        return adsBridge;
    };

    /**
     * 运行压入执行栈中的js需要执行的命令
     * @param {Object} cmd
     */

    MobadsSdk._executeCmdInBackground = function (cmd, inBackground) {
        if (!MobadsSdk.adsBridge) {
            MobadsSdk.adsBridge = MobadsSdk._createBridge();
        }
        var finalCmd = {
            type: 'cmd',
            value: cmd
        };
        if (inBackground) {
            finalCmd['inBackground'] = '1';
        }

        MobadsSdk.commandQueue.push(finalCmd);
        var cmds = MobadsSdk.commandQueue;
        MobadsSdk.adsBridge.src = 'mobads://fire' + '?ts=' + new Date().getTime();

    };

    MobadsSdk._executeCmd = function (cmd) {
        MobadsSdk._executeCmdInBackground(cmd, false);
    };

    // end
    MobadsSdk.popCommandInstance = function () {
        var cmds = MobadsSdk.commandQueue;
        MobadsSdk.commandQueue = [];
        // alert(JSON.stringify(cmds));
        return JSON.stringify(cmds);
    };

    /**
     * 设置点击后动作的url，调用native打开LP、拨打电话、下载..
     *
     * @function
     * @version
     * @param {string} url JSON.stringify的动作命令
     * @param {boolean} dumpar 可选
     */
    MobadsSdk.setActionUrl = function (url, dumpar) {
        var cmd = {
            local: {},
            invoke: [{
                s: {
                    s: 'BaiduMobAdSplashAdManager',
                    v: 'sharedSplashAdManager',
                    p: []
                },
                v: 'setActionUrlForWeb:dumpar:',
                p: [{
                    t: 'NSString',
                    v: url
                },
                    {
                        t: 'BOOL',
                        v: dumpar
                    }]
            }],
            callback: ''
        };
        MobadsSdk._executeCmd(cmd);
    };

    MobadsSdk.onAdPlayEnd = function () {
        var cmd = {
            local: {},
            invoke: [{
                s: {
                    s: 'BaiduMobAdSplashAdManager',
                    v: 'sharedSplashAdManager',
                    p: []
                },
                v: 'dissmissSplash',
                p: []
            }],
            callback: ''
        };
        MobadsSdk._executeCmd(cmd);
    };

    var send3rdLog = function (isShowLog, ad) {
        if (!ad || !ad.mon) {
            return;
        }

        var url;
        for (var i = 0; i < ad.mon.length; ++i) {
            url = isShowLog ? ad.mon[i].s : ad.mon[i].c;
            if (!url) {
                continue;
            }
            new Image().src = url;
        }
    };


    /**
     * 设置点击后动作的url，调用native打开LP、拨打电话、下载、sms..
     *
     * @function
     * @version
     *  1.0 new method
     *  1.1 增加 act参数，扩展此方法
     *    Native SDK提供的setActionUrl(url, inapp)
     *    Android 2.0 setActionUrl只接受2个参数（Android有严格匹配参数个数机制）
     *    为保持向下兼容第一个参数将以json string格式传递，
     *    所有有效信息请从第1个参数获取；SMS，MAIL，PHONE会经过iframe
     *    触发urlchange事件，不通过此方法。
     *
     *    新的Native SDK提供setActionUrl(par, dump-par)
     *    par.act {number} Action Type，
     *        参见baidu.mobads.Act(此处par不是object，下同)
     *    par.url {string} act为baidu.mobads.Act.Video时此处为ad id
     *    par.inapp {boolean} 是否应用内展示
     *    dumppar {boolean} 固定为true，请在native中忽略此参数，
     *        仅用作兼容Android SDK 2.0
     *  1.2 支持所有act
     *    所有act都经过setActionUrl跳转，保持良好的结构，便于今后支持扩展
     *  1.3 增加close按钮可见性控制
     * @param {(string | Object)} url url 或object
     * @param {?string} url.url url传入Object时的url
     * @param {?boolean} url.inapp url传入Object时的inapp
     * @param {?number} url.act url传入Object时的act
     * @param {?string} url.title url传入Object时的title
     * @param {?boolean} url.close url传入Object时的close
     *
     * @param {?string} url.logurl 广告的日志发送地址
     * @param {?string} url.weibo 工具栏微博地址
     * @param {?string} url.map 工具栏地图地址
     * @param {?string} url.search 工具栏搜索关键词
     * @param {?string} url.sms 工具栏短信url
     * @param {?number} url.at 工具栏当前banner广告的类型
     *
     * @param {?boolean} inapp 是否内部打开
     * @param {?number} act baidu.mobads.Act
     * @param {?string} title 广告title
     * @param {?boolean} close close按钮可见性控制
     */
    Sdk.setActionUrl = function (url, inapp, act, title, close) {
        var opt = {};
        if ('[object Object]' === Object.prototype.toString.call(url)) {
            opt = url;

            url = opt.url;
            inapp = opt.inapp;
            act = opt.act;
            title = opt.title;
            close = opt.close;
        }
        // 设置默认值
        opt.url = url || '';
        opt.inapp = inapp || false;
        opt.act = act || 1;
        opt.title = title || '';
        opt.close = close || false;

        // 兼容 3.1 所以都传这些参数
        opt.logurl = opt.logurl || '';
        opt.weibo = opt.weibo || '';
        opt.map = opt.map || '';
        opt.search = opt.search || '';
        opt.sms = opt.sms || '';
        opt.at = opt.at || 1;

        // 添加应用内下载 tid 参数
        opt.tid = opt.tid || '';

        /**
         * 异步处理，后续操作
         */
        if (MobadsSdk.setActionUrl) {
            var DUMP_PAR = opt.inapp; // 无用参数
            MobadsSdk.setActionUrl(JSON.stringify(opt), DUMP_PAR);
        }

    };

    /**
     * ajax发送点击日志，对于非302的方式进行点击日志的发送
     * @param {string} logurl 点击日志发送地址
     */
    Sdk.sendClickLog = function (logurl) {
        new Image().src = logurl;
    };

    /**
     * 广告结束通知native
     */
    Sdk.onAdPlayEnd = function () {
        // Sdk.setVisibility(mob.View.INVISIBLE);
        if (MobadsSdk.onAdPlayEnd) {
            setTimeout(function () {
                    MobadsSdk.onAdPlayEnd();
                },
                300);
        }
    };

    /**
     * 提供给html片段的open方法
     * @param {string} url 请求地址
     * @param {Object} options 请求参数
     * @function
     */
    Sdk.open = function (url, options) {
        send3rdLog(false, options);

        var option = {
            url: url,
            inapp: true,
            act: mob.Act.LP
        };
        Sdk.setActionUrl(option);
    };

    /**
     * 提供给html片段的开始下载方法
     * @param {string} url 请求地址
     * @param {Object} options 请求参数
     * @function
     */
    Sdk.startDownload = function (url, options) {
        var ad = {};
        ad = options || {};
        ad.tit = options && options.tit || '';
        var mobadsJumpUrl = url;
        send3rdLog(false, options);

        /**
        由于android有remote，下载的主要逻辑在native，
        iOS的主要控制逻辑在js，下载类有三种情况：
        1)越狱的下载类
        2)应用内下载
        3)跳出下载
        android的下载类跟iOS的最后一种使用同样的传递给native·
         */
        // 1)越狱类的下载
        if (/^itms-services:\/\//.test(url)) {
            Sdk.setActionUrl(url, false, mob.Act.DL, ad.tit, true);
            return;
        }

        // 2)应用内下载
        if (Sdk.isIOS) {
            var tid = options && options.pinfo && options.pinfo.tid;
            if (tid) {
                Sdk.sendClickLog(mobadsJumpUrl);
            }
            // 通知 native 开始下载
            Sdk.setActionUrl({
                url: url,
                tid: tid || '',
                inapp: true,
                act: mob.Act.DL
            });
            return;
        }

        Sdk.setActionUrl({
            url: mobadsJumpUrl,
            inapp: true,
            act: mob.Act.DL,
            close: true,
            adid: ad.id,
            originUrl: mobadsJumpUrl,
            dlTunnel: 3,
            // 下载工具
            autoOpen: true,
            popNotif: true,
            // 现在完成时是否弹出通知栏
            isWifiTargeted: ad.wi ? true : false,
            isTooLarge: ad.wi ? true : false,
            canCancel: true,
            canDelete: 5,
            mon: options && options.mon || []
        });


    };

    /**
     * 提供给html片段的处理点击事件
     * @param {Object} options 请求参数
     * @function
     */
    Sdk.handleClick = function (options) {
        var ad = options || {};
        var Act = mob.Act;
        if (Act.LP === ad.act) {
            Sdk.open(ad.curl, ad);
        } else if (Act.DL === ad.act) {
            Sdk.startDownload(ad.curl, ad);
        }
    };

})();
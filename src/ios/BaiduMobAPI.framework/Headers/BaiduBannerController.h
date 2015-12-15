

#import <UIKit/UIKit.h>
#import "BaiduMobAdView.h"
//#import "Cordova/CDV.h"
#import "BaiduMobAdInterstitialDelegate.h"
#import "BaiduAPI.h"

@interface BaiduBannerController : UIViewController <BaiduMobAdViewDelegate,BaiduMobAdInterstitialDelegate>{
    CGSize adSize;
    int _position;//0表示绝对位置
    int _targetX;
    int _targetY;
}
@property (nonatomic,retain) BaiduMobAdView *adBanner;
@property (nonatomic,copy) NSString*  baiduCachedID;
@property (nonatomic,copy)  NSString*  baiduCachedKey;
 @property (nonatomic,retain) BaiduAPI* context;

-(void) destroyADView;
-(void) createView:(int) w  withHeight: (int) h andGid:(NSString*) gid andKey:(NSString*) key;
-(void) showBanner:(int)position ;
-(void) showBannerAbsolute:(int)x withY:(int)y;
-(void) hideBanner;
@end

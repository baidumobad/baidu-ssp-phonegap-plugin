#import <Foundation/Foundation.h>
//#import "BaiduMobAdInterstitialDelegate.h"
#import "BaiduAPI.h"
#import <BaiduMobAdSDK/BaiduMobAdInterstitialDelegate.h>
@interface BaiduFullDelege : NSObject <BaiduMobAdInterstitialDelegate>{
}
@property (nonatomic,retain) BaiduAPI* context;
@property (nonatomic,copy) NSString *baiduPublisherID;
@property (nonatomic,copy) NSString *baiduFullID;
@end

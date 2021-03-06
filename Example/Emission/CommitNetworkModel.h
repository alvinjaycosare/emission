#import <Foundation/Foundation.h>

// See /scripts/deploy_master.sh

@interface Metadata: NSObject
@property NSString * _Nullable title; // PR description
@property NSString * _Nullable sha; // Full SHA of commit used
@property NSString * _Nullable date; // ISO8601 string of date for JS upload
@property NSNumber * _Nullable number; // PR number of last merged commit

- (instancetype _Nonnull )initFromJSONDict:(NSDictionary * _Nonnull)dict;

@end

@interface CommitNetworkModel : NSObject

- (NSURL *_Nonnull)fileURLForLatestCommitJavaScript;
- (NSURL *_Nonnull)fileURLForLatestCommitMetadata;

  // First passes some metadata back, before downloading the larger JS for emission from master
- (void)downloadJavaScriptForMasterCommit:(void (^ _Nonnull)(NSString * _Nullable title, NSString * _Nullable subtitle))metadata completion:(void (^_Nonnull)(NSURL * _Nullable downloadedFileURL, NSError * _Nullable error))completionHandler;

- (void)downloadMetadataForMasterCommit:(void (^_Nonnull)(NSError * _Nullable error, Metadata * _Nullable metadata))completionHandler;

@end

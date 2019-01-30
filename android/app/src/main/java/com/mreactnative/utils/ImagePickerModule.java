package com.mreactnative.utils;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.support.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

/**
 * desc:
 *
 * @author fengjing.lin on 2018/12/5 13:46
 */
public class ImagePickerModule extends ReactContextBaseJavaModule {

    private static final int IMAGE_PICKER_REQUEST = 467081;
    private static final String E_ACTIVITY_DOES_NOT_EXIST = "E_ACTIVITY_DOES_NOT_EXIST";
    private static final String E_PICKER_CANCELLED = "E_PICKER_CANCELLED";
    private static final String E_FAILED_TO_SHOW_PICKER = "E_FAILED_TO_SHOW_PICKER";
    private static final String E_NO_IMAGE_DATA_FOUND = "E_NO_IMAGE_DATA_FOUND";

    private Promise mPickerPromise;
    private Promise activityLifeCyclePromise;

    public ImagePickerModule(final ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(new BaseActivityEventListener() {
            @Override
            public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent intent) {
                if (requestCode == IMAGE_PICKER_REQUEST) {
                    if (mPickerPromise != null) {
                        if (resultCode == Activity.RESULT_CANCELED) {
                            mPickerPromise.reject(E_PICKER_CANCELLED, "Image picker was cancelled");
                        } else if (resultCode == Activity.RESULT_OK) {
                            Uri uri = intent.getData();

                            if (uri == null) {
                                mPickerPromise.reject(E_NO_IMAGE_DATA_FOUND, "No image data found");
                            } else {
                                WritableMap mMap = Arguments.createMap();
                                mMap.putString("uri", uri.toString());
                                mPickerPromise.resolve(mMap);
                            }
                        }

                        mPickerPromise = null;
                    }
                }
            }
        });
        reactContext.addLifecycleEventListener(new LifecycleEventListener() {
            @Override
            public void onHostResume() {
                System.out.println("linfj onHostResume");
                WritableMap lifeMap = Arguments.createMap();
                lifeMap.putString("life", "native onHostResume:"+getCurrentActivity().getLocalClassName());
                sendEvent(reactContext,"lifeCycle",lifeMap);
            }

            @Override
            public void onHostPause() {
                WritableMap lifeMap = Arguments.createMap();
                lifeMap.putString("life", "native onHostPause:"+getCurrentActivity().getLocalClassName());
                sendEvent(reactContext,"lifeCycle",lifeMap);
            }

            @Override
            public void onHostDestroy() {
                WritableMap lifeMap = Arguments.createMap();
                lifeMap.putString("life", "native onHostDestroy:"+getCurrentActivity().getLocalClassName());
                sendEvent(reactContext,"lifeCycle",lifeMap);
            }
        });
    }

    private void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(eventName, params);
    }

    @Override
    public String getName() {
        return "ImagePickerModule";
    }

    @ReactMethod
    public void life(final Promise promise) {
        activityLifeCyclePromise = promise;
    }

    @ReactMethod
    public void pickImage(final Promise promise) {
        System.out.println("linfj enter pickImage method");
        Activity currentActivity = getCurrentActivity();

        if (currentActivity == null) {
            promise.reject(E_ACTIVITY_DOES_NOT_EXIST, "Activity doesn't exist");
            return;
        }

        // Store the promise to resolve/reject when picker returns data
        mPickerPromise = promise;

        try {
            final Intent galleryIntent = new Intent(Intent.ACTION_PICK);

            galleryIntent.setType("image/*");

            final Intent chooserIntent = Intent.createChooser(galleryIntent, "Pick an image");

            currentActivity.startActivityForResult(chooserIntent, IMAGE_PICKER_REQUEST);
        } catch (Exception e) {
            mPickerPromise.reject(E_FAILED_TO_SHOW_PICKER, e);
            mPickerPromise = null;
        }
    }
}

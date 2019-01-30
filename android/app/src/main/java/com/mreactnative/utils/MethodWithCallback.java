package com.mreactnative.utils;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * desc:
 *
 * @author fengjing.lin on 2018/12/5 13:46
 */
public class MethodWithCallback extends ReactContextBaseJavaModule {

    public MethodWithCallback(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "MethodWithCallback";
    }

    @ReactMethod
    public void dobiz(int param, Callback successCallback, Callback errorCallback) {
        if (param % 2 == 0) {
            successCallback.invoke(param + " 是偶数");
        } else {
            errorCallback.invoke(param + " 是奇数");
        }
    }
}

package com.mreactnative.utils;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

import java.security.SecureRandom;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

/**
 * desc:
 *
 * @author fengjing.lin on 2018/12/5 13:46
 */
public class MethodWithPromise extends ReactContextBaseJavaModule {

    public static final String RESULT = "result";

    public MethodWithPromise(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "MethodWithPromise";
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        HashMap<Object, Object> mObjectObjectHashMap = new HashMap<>();
        mObjectObjectHashMap.put(RESULT, RESULT);
        return super.getConstants();
    }

    @ReactMethod
    public void doWithPromise(String msg, Promise promise) {
        System.out.println("linfj:" + msg);

//            Thread.sleep(1000 * 3);
        WritableMap mMap = Arguments.createMap();
        mMap.putString(RESULT, "native result this promise");
        int mI = new SecureRandom().nextInt();
        if (mI % 2 == 0) {
            promise.resolve(mMap);
        } else {
            promise.reject("-1", new RuntimeException("runtimeException"));
        }
    }
}

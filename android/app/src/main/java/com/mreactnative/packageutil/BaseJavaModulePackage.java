package com.mreactnative.packageutil;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.mreactnative.utils.ImageManager;
import com.mreactnative.utils.ImagePickerModule;
import com.mreactnative.utils.MethodWithCallback;
import com.mreactnative.utils.MethodWithPromise;
import com.mreactnative.utils.ToastUtil;

import java.util.ArrayList;
import java.util.List;

public class BaseJavaModulePackage implements ReactPackage {

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        List<ViewManager> mViewManagers=new ArrayList<>();
        mViewManagers.add(new ImageManager());
        return mViewManagers;
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        System.out.println("linfj createNativeModules");
        List<NativeModule> modules = new ArrayList<>();

        modules.add(new ToastUtil(reactContext));
        modules.add(new MethodWithCallback(reactContext));
        modules.add(new MethodWithPromise(reactContext));
        modules.add(new ImagePickerModule(reactContext));

        return modules;
    }
}
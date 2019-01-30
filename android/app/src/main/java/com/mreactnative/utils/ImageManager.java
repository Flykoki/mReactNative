package com.mreactnative.utils;

import android.graphics.Color;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.mreactnative.R;

import java.util.Map;

import javax.annotation.Nullable;

/**
 * desc:
 *
 * @author fengjing.lin on 2018/12/5 13:46
 */
public class ImageManager extends SimpleViewManager {

    ThemedReactContext reactContext;

    @Override
    public String getName() {
        return "MYImageView";
    }

    @Override
    protected ImageView createViewInstance(ThemedReactContext reactContext) {
        this.reactContext = reactContext;
        ImageView mImageView = new ImageView(reactContext);
        mImageView.setBackgroundResource(R.mipmap.ic_launcher);
        ViewGroup.LayoutParams mLayoutParams =
                new ViewGroup.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        mLayoutParams.height = 50;
        mLayoutParams.width = 50;
        mImageView.setLayoutParams(mLayoutParams);
        mImageView.setBackgroundColor(Color.WHITE);
        mImageView.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        mImageView.setTag("this is MYImageView tag");
        return mImageView;
    }

    private static final String EVENT_NAME_ONCLICK = "onClick";

    /**
     * 自定义回调事件 原生->js
     *
     * @return
     */
    @Nullable
    @Override
    public Map getExportedCustomDirectEventTypeConstants() {
//        return  MapBuilder.of(EVENT_NAME_ONCLICK,MapBuilder.of("registrationName", EVENT_NAME_ONCLICK));
        Map<String, Map<String, String>> mMapMap =
                MapBuilder.of("onClick", MapBuilder.of("registrationName", "onClick"));
        mMapMap.putAll(MapBuilder.<String, Map<String, String>>of("onColor",
                                                                  MapBuilder.<String, String>of("registrationName",
                                                                                                "onColor")));
        return mMapMap;
    }

    /**
     * 接收交互通知 js->原生
     *
     * @return
     */
    @Nullable
    @Override
    public Map<String, Integer> getCommandsMap() {
        //taskName taskId
        return MapBuilder.of("taskName", 1);
    }

    /**
     * 根据id执行 js->原生
     *
     * @param root
     * @param commandId
     * @param args
     */
    @Override
    public void receiveCommand(View root, int commandId, @Nullable ReadableArray args) {
        switch (commandId) {
            case 1:
                if (args != null) {
                    String name = args.getString(0);//获取第一个位置的数据
                    int mInt = args.getInt(1);
                    boolean mBoolean = args.getBoolean(2);
                    Toast.makeText(reactContext,
                                   "收到RN层的任务通知，开始在原生层处理任务... \n" + "参数一：" + name + ";参数二：" + mInt + ";参数三：" + mBoolean,
                                   Toast.LENGTH_SHORT)
                         .show();
                }
                break;
            default:
                break;
        }
    }

    @ReactProp(name = "hei")
    public void setHeight(ImageView view, int h) {
        System.out.println("linfj setHeight:" + h + ";view==null:" + view == null);
        ViewGroup.LayoutParams mLayoutParams = view.getLayoutParams();
        mLayoutParams.height = h;
        view.setLayoutParams(mLayoutParams);
    }

    @ReactProp(name = "tag")
    public void setTa(ImageView view, String tag) {
        System.out.println("linfj setTa:" + tag);
        WritableMap mMap = Arguments.createMap();
        mMap.putString("msg", "native recieve tag:" + tag + ";id:" + view.getId());
        /**
         * 执行原生调用js
         */
        reactContext.getJSModule(RCTEventEmitter.class)
                    .receiveEvent(view.getId(), // RN层原生层根据id绑定在一起
                                  "onColor", // 事件名称
                                  mMap// 传递的数据
                    );
    }

    @ReactProp(name = "col")
    public void setColor(ImageView view, int color) {
        System.out.println("linfj color:" + color + ";view==null:" + view == null);
    }

    @ReactProp(name = "wid")
    public void setWidth(ImageView view, int w) {
        System.out.println("linfj setWidth:" + w + ";view==null:" + view == null);
        ViewGroup.LayoutParams mLayoutParams = view.getLayoutParams();
        mLayoutParams.width = w;
        view.setLayoutParams(mLayoutParams);
    }
}

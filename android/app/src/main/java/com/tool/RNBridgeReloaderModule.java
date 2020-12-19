package com.tool;

import android.app.Activity;
import android.content.Intent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;


public class RNBridgeReloaderModule extends ReactContextBaseJavaModule {
    private ReactContext _reactContext;
    public RNBridgeReloaderModule(ReactApplicationContext reactContext){
        super(reactContext);
        _reactContext  =reactContext;
    }
    @Override
    public String getName(){
        return "BridgeReloader";
    }

    @ReactMethod
    public void reload(){
        Activity activity = getCurrentActivity();
        Intent intent = activity.getIntent();
        activity.finish();
        activity.startActivity(intent);
    }

}

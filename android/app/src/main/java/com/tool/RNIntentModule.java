package com.tool;

import android.app.Activity;
import android.content.Intent;
import android.os.Build;
import android.provider.Settings;
import androidx.core.app.NotificationManagerCompat;
import android.util.Log;
import android.net.Uri;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.WritableMap;

import java.util.HashMap;
import java.util.Map;


public class RNIntentModule extends ReactContextBaseJavaModule {
    private ReactContext _reactContext;
    public RNIntentModule(ReactApplicationContext reactContext){
        super(reactContext);
        _reactContext  =reactContext;

    }
    @Override
    public String getName(){
        return "RNIntent";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("unknow", "SanShip2017!Q@W#E$R%T^Y");
        return constants;
    }

    @ReactMethod
    public void getIntentExtra(String key, Promise promise){
        try {
            WritableMap map = Arguments.createMap();
            Log.d("RNIntentModule", "getIntentExtra:" + key + ":" + getCurrentActivity().getIntent().getStringExtra(key));
            map.putString(key, getCurrentActivity().getIntent().getStringExtra(key) );
            promise.resolve(map);
        }
        catch(Exception e){
            promise.reject(e);
        }
    }

    @ReactMethod
    public void openIntent(ReadableMap options,String type ,Callback callback){

        ReadableMapKeySetIterator iterator= options.keySetIterator();

        Intent intent = new Intent(Intent.ACTION_VIEW);
        try {
            intent.setType(type);
            while (true) {
                if (iterator.hasNextKey()) {
                    String key = iterator.nextKey();
                    Log.d("RNIntentModule", "openIntent: " + key);
                    intent.putExtra(key, options.getString(key));
                } else {
                    break;
                }
            }
            getCurrentActivity().startActivity(intent);
            callback.invoke("OK");
        }
        catch(Exception ex){
            callback.invoke("ERR" + ex);
        }
    }

    @ReactMethod
    public void makeCall(String uri ,Callback callback){

        Intent intent = new Intent(Intent.ACTION_CALL, Uri.parse(uri));
        try {
            getCurrentActivity().startActivity(intent);
            callback.invoke("OK");
        } catch (android.content.ActivityNotFoundException ex) {
            callback.invoke("ERR" + ex);
        }
    }

    @ReactMethod
    public void moveTaskToBack(){
        if (getCurrentActivity() != null)
            getCurrentActivity().moveTaskToBack(true);

    }

    @ReactMethod
    public void exit(){
        Activity activity = getCurrentActivity();
        activity.finish();
        System.exit(0);
    }

    @ReactMethod
    public void checkAllowNotify(Callback callback){
        boolean notifyEnable = NotificationManagerCompat.from(this._reactContext).areNotificationsEnabled();
        callback.invoke(notifyEnable);
    }

    @ReactMethod
    public void openPermissionSetting(){

        Intent intent = new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        Uri uri = Uri.fromParts("package", this._reactContext.getPackageName(), null);
        intent.setData(uri);
        this._reactContext.startActivity(intent);

    }

    @ReactMethod
    public void openNotifyPermissionSetting(){

        if (android.os.Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            Intent intent = new Intent();
            intent.setAction("android.settings.APP_NOTIFICATION_SETTINGS");
            intent.putExtra("app_package", this._reactContext.getPackageName());
            intent.putExtra("app_uid", this._reactContext.getApplicationInfo().uid);
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            this._reactContext.startActivity(intent);
        } else if (android.os.Build.VERSION.SDK_INT == Build.VERSION_CODES.KITKAT) {
            Intent intent = new Intent();
            intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
            intent.addCategory(Intent.CATEGORY_DEFAULT);
            intent.setData(Uri.parse("package:" + this._reactContext.getPackageName()));
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            this._reactContext.startActivity(intent);
        }

    }


}

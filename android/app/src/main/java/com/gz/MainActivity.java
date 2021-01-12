package com.gz;

import android.content.Context;
import android.content.Intent;
import android.content.res.Configuration;
import android.os.AsyncTask;
import android.os.Bundle;
import android.view.KeyEvent;

import com.facebook.common.references.SharedReference;
import com.facebook.react.ReactActivity;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.tool.FullLog;
import com.tool.HotUpdateManager;

import java.util.Locale;

//import com.oney.gcm.GcmApplication;

//class UpdateTask implements Runnable {
//    Activity mActivity;
//    UpdateTask(Activity activity) { mActivity = activity; }
//    @Override
//    public void run() {
//        String updateServer = mActivity.getResources().getString(R.string.update_server);
//        HotUpdateManager.getInstance().checkUpdate(updateServer);
//        FullLog.d( "Need update:" + Boolean.toString(HotUpdateManager.getInstance().getNewHybridVersion() > HotUpdateManager.getInstance().getHybridVersion()));
//        if(HotUpdateManager.getInstance().getNewHybridVersion() > HotUpdateManager.getInstance().getHybridVersion()){
//            HotUpdateManager.getInstance().update();
//        }
//    }
//}

public class MainActivity extends ReactActivity {


    @Override
    protected void onCreate(Bundle savedInstanceState){

//        HotUpdateManager.getInstance().init(this);
//
//       if (!BuildConfig.DEBUG) {
//            new Thread(new UpdateTask(this)).start();
//       }
//
        super.onCreate(savedInstanceState);
//
//        HotUpdateManager.getInstance().initReact(getReactNativeHost().getReactInstanceManager());

    }
    @Override
    protected void onResume(){
        super.onResume();
        //GcmApplication.activityResumed();
        Locale locale = new Locale("vi");
        Locale.setDefault(locale);
        Configuration config = getBaseContext().getResources().getConfiguration();
        config.locale = locale;
        getBaseContext().getResources().updateConfiguration(config,
                getBaseContext().getResources().getDisplayMetrics());
    }
    protected void onStart(){
      super.onStart();
      //GcmApplication.activityStarted();
    }
    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        Intent intent = new Intent("onConfigurationChanged");
        intent.putExtra("newConfig", newConfig);
        this.sendBroadcast(intent);
    }
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "GZ";
    }

    @Override
    public boolean onKeyUp(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_MENU && getReactNativeHost().getReactInstanceManager() != null) {
            getReactNativeHost().getReactInstanceManager().showDevOptionsDialog();
            if (getReactNativeHost().getReactInstanceManager().getCurrentReactContext()!= null)
                try {
                    getReactNativeHost().getReactInstanceManager().getCurrentReactContext()
                            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                            .emit("hardwareMenuPress", null);
                }
                catch(SharedReference.NullReferenceException ex){
                    ex.printStackTrace();
                }
            return true;
        }

        return super.onKeyUp(keyCode, event);
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
    }
}

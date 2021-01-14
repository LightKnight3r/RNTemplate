/**
* @Author: Trần Quốc Phương <Anonymous080>
* @Date:   2016-07-06T15:07:06+07:00
* @Email:  tranphuong.080@gmail.com
* @Last modified by:   Anonymous080
* @Last modified time: 2016-07-11T14:39:57+07:00
*/

package com.gz;

import android.app.Application;
import android.content.Context;
import android.os.AsyncTask;
import android.os.SystemClock;
import androidx.multidex.MultiDexApplication;
import android.widget.Toast;

//import com.avishayil.rnrestart.ReactNativeRestartPackage;
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;
import com.facebook.react.ReactApplication;
import com.reactnativecommunity.webview.RNCWebViewPackage;
//import ui.apptour.RNAppTourPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
// import com.github.yamill.orientation.OrientationPackage;
//import com.idehub.GoogleAnalyticsBridge.GoogleAnalyticsBridgePackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.oblador.vectoricons.VectorIconsPackage;
//import com.oney.gcm.GcmPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.rnfs.RNFSPackage;
import com.tool.FullLog;
import com.tool.HotUpdateManager;
import com.tool.HotUpdatePackage;
import com.tool.RNBridgeReloaderPackage;
import com.tool.RNIntentPackage;
import com.imagepicker.ImagePickerPackage;

import java.util.Arrays;
import java.util.List;

import ca.jaysoo.extradimensions.ExtraDimensionsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.agontuk.RNFusedLocation.RNFusedLocationPackage;
import com.airbnb.android.react.lottie.LottiePackage;
import com.facebook.react.PackageList;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import com.microsoft.codepush.react.CodePush;

class UpdateTask extends AsyncTask<Void, Boolean, Void> {

  Context mContext;
  public UpdateTask(Context ctx)
  {
    mContext=ctx;
  }

  @Override
  protected Void doInBackground(Void... params) {
    update();
    return null;
  }

  @Override
  protected void onProgressUpdate(Boolean... values) {
    super.onProgressUpdate(values);
    Toast toast = Toast.makeText(mContext, "Đang tiến hành cập nhật phiên bản mới", Toast.LENGTH_SHORT);
    toast.show();
    if (values[0]){
    }else{
      toast = Toast.makeText(mContext, "Cập nhật hoàn tất", Toast.LENGTH_SHORT);
      toast.show();
    }
  }

  private Void update() {
    String updateServer = mContext.getResources().getString(R.string.update_server);
    HotUpdateManager.getInstance().checkUpdate(updateServer);
    FullLog.d( "Need update:" + Boolean.toString(HotUpdateManager.getInstance().getNewHybridVersion() > HotUpdateManager.getInstance().getHybridVersion()));
    if(HotUpdateManager.getInstance().getNewHybridVersion() > HotUpdateManager.getInstance().getHybridVersion()){

      publishProgress(true);
      HotUpdateManager.getInstance().update();
      publishProgress(false);
    }else{
      HotUpdateManager.getInstance().setState(true);
    }
    return null;
  }
}


public class MainApplication extends MultiDexApplication implements ReactApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  @Override
  public void onCreate() {

    HotUpdateManager.getInstance().init(this.getApplicationContext());

    if (!BuildConfig.DEBUG) {
      new UpdateTask(this.getApplicationContext()).execute();
    }
    FacebookSdk.sdkInitialize(getApplicationContext());
    // If you want to use AppEventsLogger to log events.
    AppEventsLogger.activateApp(this);

    if (!BuildConfig.DEBUG) {
      while(!HotUpdateManager.getInstance().getState()){
        SystemClock.sleep(100);
      }
    }
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
    HotUpdateManager.getInstance().initReact(getReactNativeHost().getReactInstanceManager());
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    /**
     * Returns the name of the main module. Determines the URL used to fetch the JS bundle
     * from the packager server. It is only used when dev support is enabled.
     * This is the first file to be executed once the {@link ReactInstanceManager} is created.
     * e.g. "index.android"
     */
     @Override
    protected String getJSMainModuleName() {
      return "src/index.android";
    }

    // 2. Override the getJSBundleFile method in order to let
    // the CodePush runtime determine where to get the JS
    // bundle location from on each app start
    @Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }

    protected List<ReactPackage> getPackages() {
     @SuppressWarnings("UnnecessaryLocalVariable")
     List<ReactPackage> packages = new PackageList(this).getPackages();
     // Packages that cannot be autolinked yet can be added manually here, for example:
     packages.add(new RNIntentPackage());
     return packages;
   }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }

  /**
 * Loads Flipper in React Native templates.
 *
 * @param context
 */
 private static void initializeFlipper(Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.rndiffapp.ReactNativeFlipper");
        aClass
            .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
            .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}

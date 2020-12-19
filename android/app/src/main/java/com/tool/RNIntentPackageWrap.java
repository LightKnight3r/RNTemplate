package com.tool;

import android.app.Activity;

import com.facebook.react.ReactPackage;
public class RNIntentPackageWrap {
    private RNIntentPackage _RNIntentPackage;
    private Activity _mainActivity;

    public RNIntentPackageWrap(Activity mainActivity){
        _mainActivity = mainActivity;
    }

    public ReactPackage getReactPackage() {
        if (_RNIntentPackage == null) {
            _RNIntentPackage = new RNIntentPackage();
        }
        return _RNIntentPackage;
    }

}

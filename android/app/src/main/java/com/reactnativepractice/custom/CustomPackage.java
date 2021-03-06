package com.reactnativepractice.custom;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.reactnativepractice.custom.params.CustomParamsMoudle;
import com.reactnativepractice.customview.ReactMyViewPagerManager;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by Rookie on 2017/8/28.
 */

public class CustomPackage implements ReactPackage {


    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> mModules = new ArrayList<>();
        mModules.add(new CustomToastModule(reactContext));
        mModules.add(new CustomParamsMoudle(reactContext));
        return mModules;
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Arrays.<ViewManager>asList(new ReactMyViewPagerManager());
    }
}

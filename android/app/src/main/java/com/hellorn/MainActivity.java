package com.hellorn;

import android.content.Intent;
import android.view.ViewManager;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

    ViewManager mViewManager;

    @Override
    public void startActivity(Intent intent) {
        super.startActivity(intent);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "HelloRN";
    }
}

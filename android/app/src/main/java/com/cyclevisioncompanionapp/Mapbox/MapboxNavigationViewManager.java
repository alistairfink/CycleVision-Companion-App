package com.cyclevisioncompanionapp.Mapbox;

import android.app.Activity;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.widget.FrameLayout;

import androidx.annotation.Nullable;
import androidx.annotation.UiThread;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.common.UIManagerType;
import com.mapbox.api.directions.v5.models.DirectionsResponse;
import com.mapbox.geojson.Point;
import com.mapbox.mapboxsdk.Mapbox;
import com.mapbox.services.android.navigation.ui.v5.NavigationLauncher;
import com.mapbox.services.android.navigation.ui.v5.NavigationLauncherOptions;
import com.mapbox.services.android.navigation.v5.navigation.MapboxNavigation;
import com.mapbox.services.android.navigation.v5.navigation.NavigationRoute;
import com.cyclevisioncompanionapp.R;

import java.util.Map;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MapboxNavigationViewManager extends SimpleViewManager<MapboxNavigationView> {

    public static final String REACT_CLASS = "MapboxNavigationView";

    private ReactApplicationContext context;
    private MapboxNavigationView mapboxNavigationView;

    private ReadableMap origin;
    private ReadableMap destination;

    public MapboxNavigationViewManager(ReactApplicationContext reactContext) {
        this.context = reactContext;

        this.initMapbox();
    }

    public void initMapbox(){
        new Handler(Looper.getMainLooper()).post(new Runnable() {
            @Override
            public void run() {
                Mapbox.getInstance(context, context.getString(R.string.mapbox_access_token));
            }
        });
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public MapboxNavigationView createViewInstance(ThemedReactContext reactContext) {
        mapboxNavigationView = new MapboxNavigationView(context);
        return mapboxNavigationView;
    }
    // do yourself a favor and create on update function, so you get your updates at once. this makes everything much easier. ReadableMap is able to read javascript objects pretty easy.
    @ReactProp(name = "origin")
    public void setOrigin(MapboxNavigationView MapboxNavigationView, @Nullable ReadableMap origin) {
        this.origin = origin;
        if(this.origin != null && this.destination != null) updateRoute();
    }

    // do yourself a favor and create on update function, so you get your updates at once. this makes everything much easier. ReadableMap is able to read javascript objects pretty easy.
    @ReactProp(name = "destination")
    public void setDestination(MapboxNavigationView MapboxNavigationView, @Nullable ReadableMap destination) {
        this.destination = destination;
        if(this.origin != null && this.destination != null) updateRoute();
    }

    public void updateRoute()
    {
        //Point.fromLngLat(destination.getDouble("long"),destination.getDouble("lat"));
        mapboxNavigationView.navigateToDestination(Point.fromLngLat(destination.getDouble("long"),destination.getDouble("lat")));
    }
}
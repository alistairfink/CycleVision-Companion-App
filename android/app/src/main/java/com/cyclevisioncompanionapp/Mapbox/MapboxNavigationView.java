package com.cyclevisioncompanionapp.Mapbox;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.res.Resources;
import android.location.Location;
import android.view.View;
import android.widget.LinearLayout;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.mapbox.android.core.location.LocationEngine;
import com.mapbox.android.core.location.LocationEngineCallback;
import com.mapbox.android.core.location.LocationEngineProvider;
import com.mapbox.android.core.location.LocationEngineRequest;
import com.mapbox.android.core.location.LocationEngineResult;
import com.mapbox.api.directions.v5.DirectionsCriteria;
import com.mapbox.api.directions.v5.models.DirectionsResponse;
import com.mapbox.api.directions.v5.models.DirectionsRoute;
import com.mapbox.geojson.Point;
import com.mapbox.mapboxsdk.Mapbox;

import com.mapbox.mapboxsdk.camera.CameraPosition;
import com.mapbox.mapboxsdk.camera.CameraUpdate;
import com.mapbox.mapboxsdk.camera.CameraUpdateFactory;
import com.mapbox.mapboxsdk.geometry.LatLng;
import com.mapbox.mapboxsdk.geometry.LatLngBounds;
import com.mapbox.mapboxsdk.location.modes.RenderMode;
import com.mapbox.mapboxsdk.maps.MapView;
import com.mapbox.mapboxsdk.maps.MapboxMap;
import com.mapbox.mapboxsdk.maps.OnMapReadyCallback;
import com.mapbox.mapboxsdk.maps.Style;
import com.mapbox.services.android.navigation.ui.v5.camera.DynamicCamera;
import com.mapbox.services.android.navigation.ui.v5.camera.NavigationCamera;
import com.mapbox.services.android.navigation.ui.v5.camera.NavigationCameraUpdate;
import com.mapbox.services.android.navigation.ui.v5.instruction.InstructionView;
import com.mapbox.services.android.navigation.ui.v5.map.NavigationMapboxMap;
import com.mapbox.services.android.navigation.ui.v5.voice.NavigationSpeechPlayer;
import com.mapbox.services.android.navigation.ui.v5.voice.SpeechAnnouncement;
import com.mapbox.services.android.navigation.ui.v5.voice.SpeechPlayerProvider;
import com.mapbox.services.android.navigation.ui.v5.voice.VoiceInstructionLoader;
import com.mapbox.services.android.navigation.v5.milestone.Milestone;
import com.mapbox.services.android.navigation.v5.milestone.MilestoneEventListener;
import com.mapbox.services.android.navigation.v5.milestone.VoiceInstructionMilestone;
import com.mapbox.services.android.navigation.v5.navigation.MapboxNavigation;
import com.mapbox.services.android.navigation.v5.navigation.NavigationRoute;
import com.mapbox.services.android.navigation.v5.offroute.OffRouteListener;
import com.mapbox.services.android.navigation.v5.routeprogress.ProgressChangeListener;
import com.mapbox.services.android.navigation.v5.routeprogress.RouteProgress;
import com.cyclevisioncompanionapp.R;

import java.io.File;
import java.lang.ref.WeakReference;
import java.util.List;
import java.util.Locale;

import okhttp3.Cache;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import timber.log.Timber;

public class MapboxNavigationView extends LinearLayout implements ProgressChangeListener, MilestoneEventListener, OffRouteListener {


    private static final int FIRST = 0;
    private static final int ONE_HUNDRED_MILLISECONDS = 100;
    private static final int BOTTOMSHEET_PADDING_MULTIPLIER = 4;
    private static final int TWO_SECONDS_IN_MILLISECONDS = 2000;
    private static final double BEARING_TOLERANCE = 90d;
    private static final String LONG_PRESS_MAP_MESSAGE = "Long press the map to select a destination.";
    private static final String SEARCHING_FOR_GPS_MESSAGE = "Searching for GPS...";
    private static final String COMPONENT_NAVIGATION_INSTRUCTION_CACHE = "component-navigation-instruction-cache";
    private static final long TEN_MEGABYTE_CACHE_SIZE = 10 * 1024 * 1024;
    private static final int ZERO_PADDING = 0;
    private static final double DEFAULT_ZOOM = 12.0;
    private static final double DEFAULT_TILT = 0d;
    private static final double DEFAULT_BEARING = 0d;
    private static final long UPDATE_INTERVAL_IN_MILLISECONDS = 1000;
    private static final long FASTEST_UPDATE_INTERVAL_IN_MILLISECONDS = 500;


    private Context context;
    private final MapboxNavigationViewLocationCallback callback = new MapboxNavigationViewLocationCallback(this);
    private LocationEngine locationEngine;
    private MapboxNavigation navigation;
    private NavigationSpeechPlayer speechPlayer;
    private NavigationMapboxMap navigationMap;
    private Location lastLocation;
    private DirectionsRoute route;
    private Point destination = null;

    private InstructionView instructionView;
    private MapView mapView;

    private boolean mapLoaded = false;

    public MapboxNavigationView(ReactApplicationContext reactContext) {
        super(reactContext);

        this.context = reactContext;
        context.setTheme(R.style.CustomInstructionView);

        inflate(context, R.layout.navigation_view, this);

        mapView = findViewById(R.id.mapView);
        instructionView = findViewById(R.id.instructionView);
        mapView.onCreate(null);
        mapView.getMapAsync(new OnMapReadyCallback() {
            @Override
            public void onMapReady(@NonNull MapboxMap mapboxMap) {
                mapboxMap.setStyle(new Style.Builder().fromUri(context.getString(R.string.navigation_guidance_day)), style -> {
                    navigationMap = new NavigationMapboxMap(mapView, mapboxMap);

                    // For Location updates
                    initializeLocationEngine();

                    // For navigation logic / processing
                    initializeNavigation(mapboxMap);
                    navigationMap.updateCameraTrackingMode(NavigationCamera.NAVIGATION_TRACKING_MODE_NONE);
                    navigationMap.updateLocationLayerRenderMode(RenderMode.GPS);

                    // For voice instructions
                    initializeSpeechPlayer();
                    mapLoaded = true;
                    if(destination != null)
                    {
                        navigateToDestination(destination);
                    }
                });
            }
        });
    }
    /*
     * Navigation listeners
     */

    @Override
    public void onProgressChange(Location location, RouteProgress routeProgress) {
        // Cache "snapped" Locations for re-route Directions API requests
        updateLocation(location);

        // Update InstructionView data from RouteProgress
        instructionView.updateDistanceWith(routeProgress);
    }

    @Override
    public void onMilestoneEvent(RouteProgress routeProgress, String instruction, Milestone milestone) {
        playAnnouncement(milestone);

        // Update InstructionView banner instructions
        instructionView.updateBannerInstructionsWith(milestone);
    }

    @Override
    public void userOffRoute(Location location) {
        calculateRouteWith(destination, true);
    }

    /*
     * Activity lifecycle methods
     */


    void checkFirstUpdate(Location location) {
        if (lastLocation == null) {
            lastLocation = location;
            moveCameraTo(location);
            if(destination != null ) navigateToDestination(destination);
            // Allow navigationMap clicks now that we have the current Location
        }
    }

    void updateLocation(Location location) {
        lastLocation = location;
        navigationMap.updateLocation(location);
    }

    private void initializeSpeechPlayer() {
        String english = Locale.US.getLanguage();
        Cache cache = new Cache(new File(context.getCacheDir(), COMPONENT_NAVIGATION_INSTRUCTION_CACHE),
                TEN_MEGABYTE_CACHE_SIZE);
        VoiceInstructionLoader voiceInstructionLoader = new VoiceInstructionLoader(context,
                Mapbox.getAccessToken(), cache);
        SpeechPlayerProvider speechPlayerProvider = new SpeechPlayerProvider(context, english, true,
                voiceInstructionLoader);
        speechPlayer = new NavigationSpeechPlayer(speechPlayerProvider);
    }

    @SuppressLint("MissingPermission")
    private void initializeLocationEngine() {
        locationEngine = LocationEngineProvider.getBestLocationEngine(context);
        LocationEngineRequest request = buildEngineRequest();
        locationEngine.requestLocationUpdates(request, callback, null);

    }

    private void initializeNavigation(MapboxMap mapboxMap) {
        navigation = new MapboxNavigation(context, Mapbox.getAccessToken());
        navigation.setLocationEngine(locationEngine);
        navigation.setCameraEngine(new DynamicCamera(mapboxMap));
        navigation.addProgressChangeListener(this);
        navigation.addMilestoneEventListener(this);
        navigation.addOffRouteListener(this);
        navigationMap.addProgressChangeListener(navigation);
    }


    private void playAnnouncement(Milestone milestone) {
        if (milestone instanceof VoiceInstructionMilestone) {
            SpeechAnnouncement announcement = SpeechAnnouncement.builder()
                    .voiceInstructionMilestone((VoiceInstructionMilestone) milestone)
                    .build();
            speechPlayer.play(announcement);
        }
    }

    private void moveCameraTo(Location location) {
        CameraPosition cameraPosition = buildCameraPositionFrom(location, location.getBearing());
        navigationMap.retrieveMap().animateCamera(
                CameraUpdateFactory.newCameraPosition(cameraPosition), TWO_SECONDS_IN_MILLISECONDS
        );
    }

    private void moveCameraToInclude(Point destination) {
        LatLng origin = new LatLng(lastLocation);
        LatLngBounds bounds = new LatLngBounds.Builder()
                .include(origin)
                .include(new LatLng(destination.latitude(), destination.longitude()))
                .build();
        Resources resources = getResources();
        int routeCameraPadding = (int) resources.getDimension(R.dimen.component_navigation_route_camera_padding);
        int[] padding = {routeCameraPadding, routeCameraPadding, routeCameraPadding, routeCameraPadding};
        CameraPosition cameraPosition = navigationMap.retrieveMap().getCameraForLatLngBounds(bounds, padding);
        navigationMap.retrieveMap().animateCamera(
                CameraUpdateFactory.newCameraPosition(cameraPosition), TWO_SECONDS_IN_MILLISECONDS
        );
    }

    private void moveCameraOverhead() {
        if (lastLocation == null) {
            return;
        }
        CameraPosition cameraPosition = buildCameraPositionFrom(lastLocation, DEFAULT_BEARING);
        navigationMap.retrieveMap().animateCamera(
                CameraUpdateFactory.newCameraPosition(cameraPosition), TWO_SECONDS_IN_MILLISECONDS
        );
    }

    @Nullable
    private CameraUpdate cameraOverheadUpdate() {
        if (lastLocation == null) {
            return null;
        }
        CameraPosition cameraPosition = buildCameraPositionFrom(lastLocation, DEFAULT_BEARING);
        return CameraUpdateFactory.newCameraPosition(cameraPosition);
    }

    @NonNull
    private CameraPosition buildCameraPositionFrom(Location location, double bearing) {
        return new CameraPosition.Builder()
                .zoom(DEFAULT_ZOOM)
                .target(new LatLng(location.getLatitude(), location.getLongitude()))
                .bearing(bearing)
                .tilt(DEFAULT_TILT)
                .build();
    }

    private void adjustMapPaddingForNavigation() {
        Resources resources = getResources();
        int mapViewHeight = mapView.getHeight();
        int bottomSheetHeight = (int) resources.getDimension(R.dimen.component_navigation_bottomsheet_height);
        int topPadding = mapViewHeight - (bottomSheetHeight * BOTTOMSHEET_PADDING_MULTIPLIER);
        navigationMap.retrieveMap().setPadding(ZERO_PADDING, topPadding, ZERO_PADDING, ZERO_PADDING);
    }

    private void resetMapAfterNavigation() {
        navigationMap.removeRoute();
        navigationMap.clearMarkers();
        navigation.stopNavigation();
        moveCameraOverhead();
    }

    private void removeLocationEngineListener() {
        if (locationEngine != null) {
            locationEngine.removeLocationUpdates(callback);
        }
    }

    @SuppressLint("MissingPermission")
    private void addLocationEngineListener() {
        if (locationEngine != null) {
            LocationEngineRequest request = buildEngineRequest();
            locationEngine.requestLocationUpdates(request, callback, null);
        }
    }

    private void calculateRouteWith(Point destination, boolean isOffRoute) {
        Point origin = Point.fromLngLat(lastLocation.getLongitude(), lastLocation.getLatitude());
        Double bearing = Float.valueOf(lastLocation.getBearing()).doubleValue();
        NavigationRoute.builder(context)
                .accessToken(Mapbox.getAccessToken())
                .origin(origin, bearing, BEARING_TOLERANCE)
                .destination(destination)
                .profile(DirectionsCriteria.PROFILE_CYCLING)
                .build()
                .getRoute(new Callback<DirectionsResponse>() {
                    @Override
                    public void onResponse(@NonNull Call<DirectionsResponse> call, @NonNull Response<DirectionsResponse> response) {
                        handleRoute(response, isOffRoute);
                    }

                    @Override
                    public void onFailure(@NonNull Call<DirectionsResponse> call, @NonNull Throwable throwable) {
                        Timber.e("fuck;");
                    }
                });
    }


    public void navigateToDestination(Point destination)
    {
        this.destination = destination;
        if(mapLoaded && lastLocation != null) calculateRouteWith(destination, false);
    }

    private void quickStartNavigation() {
        // Transition to navigation state


        // Show the InstructionView
        instructionView.setVisibility(View.VISIBLE);

        adjustMapPaddingForNavigation();
        // Updates camera with last location before starting navigating,
        // making sure the route information is updated
        // by the time the initial camera tracking animation is fired off
        // Alternatively, NavigationMapboxMap#startCamera could be used here,
        // centering the map camera to the beginning of the provided route
        navigationMap.resumeCamera(lastLocation);
        navigation.startNavigation(route);

        // Location updates will be received from ProgressChangeListener
        removeLocationEngineListener();

        // TODO remove example usage
        navigationMap.resetCameraPositionWith(NavigationCamera.NAVIGATION_TRACKING_MODE_GPS);
        CameraUpdate cameraUpdate = cameraOverheadUpdate();
        if (cameraUpdate != null) {
            NavigationCameraUpdate navUpdate = new NavigationCameraUpdate(cameraUpdate);
            navigationMap.retrieveCamera().update(navUpdate);
        }
    }

    private void handleRoute(Response<DirectionsResponse> response, boolean isOffRoute) {
        List<DirectionsRoute> routes = response.body().routes();
        if (!routes.isEmpty()) {
            route = routes.get(FIRST);
            navigationMap.drawRoute(route);
            if (isOffRoute) {
                navigation.startNavigation(route);
            }else quickStartNavigation();
        }
    }


    @NonNull
    private LocationEngineRequest buildEngineRequest() {
        return new LocationEngineRequest.Builder(UPDATE_INTERVAL_IN_MILLISECONDS)
                .setPriority(LocationEngineRequest.PRIORITY_HIGH_ACCURACY)
                .setFastestInterval(FASTEST_UPDATE_INTERVAL_IN_MILLISECONDS)
                .build();
    }


    private static class MapboxNavigationViewLocationCallback implements LocationEngineCallback<LocationEngineResult> {

        private final WeakReference<MapboxNavigationView> activityWeakReference;

        MapboxNavigationViewLocationCallback(MapboxNavigationView activity) {
            this.activityWeakReference = new WeakReference<>(activity);
        }

        @Override
        public void onSuccess(LocationEngineResult result) {
            MapboxNavigationView activity = activityWeakReference.get();
            if (activity != null) {
                Location location = result.getLastLocation();
                if (location == null) {
                    return;
                }
                activity.checkFirstUpdate(location);
                activity.updateLocation(location);
            }
        }

        @Override
        public void onFailure(@NonNull Exception exception) {

        }
    }
}
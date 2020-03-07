// 3rd Party
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Alert,
  Image,
  PermissionsAndroid,
  NativeModules,
  BackHandler,
} from 'react-native';
import SystemSetting from 'react-native-system-setting';
import AsyncStorage from '@react-native-community/async-storage';
import RNEventSource from 'react-native-event-source';
import wifi from 'react-native-android-wifi';

// Styles
import SharedStyles from '../styles/SharedStyles';
import Colours from '../styles/Colours';
import WithoutNavigationFlowStyles from '../styles/WithoutNavigationFlowStyles';

// Components
import SettingsMenu from './SettingsMenu';
import BatteryIndicator from './BatteryIndicator';
import BackButton from './BackButton';
import VideoView from './VideoView';

// Utilities
import {
  DEVICE_URL_KEY,
  VIDEO_API,
  DEFAULT_DEVICE_IP,
  EVENT_API,
} from '../utilities/Constants';

function WithoutNavigationFlow({navigation}) {
  const [originalBrightness, setOriginalBrightness] = useState(1);
  const dimBrightness = 0.0;
  const [videoURL, setVideoURL] = useState(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    SystemSetting.getBrightness().then(brightness => {
      setOriginalBrightness(brightness);
    });

    setBrightness();
    let es = null;
    let getURL = async () => {
      const baseIP = await AsyncStorage.getItem(DEVICE_URL_KEY);
      if (baseIP === null) {
        baseIP = DEFAULT_DEVICE_IP;
      }

      setVideoURL(baseIP + VIDEO_API);
      es = new RNEventSource(baseIP + EVENT_API);
      es.addEventListener('message', data => {
        handleEvent(data.data);
      });
    };

    getURL();
    BackHandler.addEventListener('hardwareBackPress', resetBrightness);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', resetBrightness);
      if (es !== null) {
        es.removeAllListeners();
        es.close();
      }
    };
  }, [
    setOriginalBrightness,
    setBrightness,
    resetBrightness,
    setVideoURL,
    handleEvent,
  ]);

  const setBrightness = () => {
    SystemSetting.setBrightnessForce(dimBrightness).then(success => {
      !success &&
        Alert.alert(
          'Permission Deny',
          'You have no permission changing settings',
          [
            {text: 'Ok', style: 'cancel'},
            {
              text: 'Open Setting',
              onPress: () => SystemSetting.grantWriteSettingPermission(),
            },
          ],
        );
    });
  };

  const resetBrightness = () => {
    SystemSetting.setBrightnessForce(originalBrightness).then(success => {
      !success &&
        Alert.alert(
          'Permission Deny',
          'You have no permission changing settings',
          [
            {text: 'Ok', style: 'cancel'},
            {
              text: 'Open Setting',
              onPress: () => SystemSetting.grantWriteSettingPermission(),
            },
          ],
        );
    });
  };

  const navigateToRideFinished = () => {
    resetBrightness();
    navigation.navigate('RideFinished');
  };

  const handleEvent = data => {
    if (data === 'True') {
      resetBrightness();
      wifi.forceWifiUsage(true);
      setShowVideo(true);
    } else if (data === 'False') {
      setBrightness();
      wifi.forceWifiUsage(false);
      setShowVideo(false);
    }
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" backgroundColor={Colours.Primary} />
      <View style={WithoutNavigationFlowStyles.Outer}>
        <View style={WithoutNavigationFlowStyles.Header}>
          <View style={WithoutNavigationFlowStyles.BackOuter}>
            <BackButton
              navigation={navigation}
              override={() => resetBrightness()}
            />
          </View>
          <TouchableOpacity
            style={SharedStyles.Styles.CameraButtonOuter}
            onPress={() => {
              showVideo ? handleEvent('False') : handleEvent('True');
            }}>
            <Image
              style={SharedStyles.Styles.CameraButton}
              source={require('../resources/Camera.png')}
            />
          </TouchableOpacity>
          <SettingsMenu
            navigation={navigation}
            override={() => resetBrightness()}
            goBackOverride={() => setBrightness()}
          />
        </View>
        <View style={WithoutNavigationFlowStyles.EmptyBody}>
          {showVideo && videoURL !== null && <VideoView videoURL={videoURL} />}
        </View>
        <View style={WithoutNavigationFlowStyles.Footer}>
          <View style={WithoutNavigationFlowStyles.FooterLeft}>
            <BatteryIndicator />
          </View>
          <View style={WithoutNavigationFlowStyles.FooterRight}>
            <TouchableOpacity
              style={WithoutNavigationFlowStyles.EndRideOuter}
              onPress={() => navigateToRideFinished()}>
              <Text style={WithoutNavigationFlowStyles.EndRideText}>
                End Ride
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default WithoutNavigationFlow;

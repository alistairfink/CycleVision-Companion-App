// 3rd Party
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
  PermissionsAndroid,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import wifi from 'react-native-android-wifi';

// Styles
import HomeStyles from '../styles/HomeStyles';
import SharedStyles from '../styles/SharedStyles';
import Colours from '../styles/Colours';
import BatteryIndicator from './BatteryIndicator';

// Components
import SettingsMenu from './SettingsMenu';

// Utilities
import {
  DEVICE_URL_KEY,
  DEFAULT_DEVICE_IP,
  HEALTH_CHECK_API,
  DEVICE_SSID_KEY,
  DEVICE_PASS_KEY,
  DEFAULT_NETWORK_SSID,
  DEFAULT_NETWORK_PASS,
} from '../utilities/Constants';
import FetchWithTimeout from '../utilities/FetchWithTimeout';

function Home({navigation}) {
  const [healthCheckURL, setHealthCheckURL] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    let wifiSetup = async () => {
      try {
        let wifiSSID = await AsyncStorage.getItem(DEVICE_SSID_KEY);
        if (wifiSSID === null) {
          wifiSSID = DEFAULT_NETWORK_SSID;
          await AsyncStorage.setItem(DEVICE_SSID_KEY, DEFAULT_NETWORK_SSID);
        }

        let wifiPass = await AsyncStorage.getItem(DEVICE_PASS_KEY);
        if (wifiPass === null) {
          wifiPass = DEFAULT_NETWORK_PASS;
          await AsyncStorage.setItem(DEVICE_PASS_KEY, DEFAULT_NETWORK_PASS);
        }

        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Wifi Networks',
            message:
              'CycleVision requires access to connect to the device over wifi.',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          wifi.setEnabled(true);
          wifi.findAndConnect(wifiSSID, wifiPass, found => {
            if (found) {
              setIsConnected(true);
              wifi.forceWifiUsage(true);
            } else {
              cantConnect();
            }
          });
        } else {
          cantConnect();
        }
      } catch (err) {
        console.warn(err);
      }
    };

    let setLocalSettings = async () => {
      try {
        let value = await AsyncStorage.getItem(DEVICE_URL_KEY);
        if (value === null) {
          value = DEFAULT_DEVICE_IP;
          await AsyncStorage.setItem(DEVICE_URL_KEY, DEFAULT_DEVICE_IP);
        }

        setHealthCheckURL(value + HEALTH_CHECK_API);
      } catch (e) {
        await AsyncStorage.setItem(DEVICE_URL_KEY, DEFAULT_DEVICE_IP);
      }
    };

    setLocalSettings();
    wifiSetup();
  }, [setHealthCheckURL, cantConnect, setIsConnected]);

  const start = () => {
    if (healthCheckURL !== null && isConnected) {
      FetchWithTimeout(healthCheckURL, {}, 5000)
        .then(result => {
          wifi.forceWifiUsage(false);
          navigation.navigate('StartRide');
        })
        .catch(e => {
          cantConnect();
        });
    } else {
      cantConnect();
    }
  };

  const cantConnect = () => {
    Alert.alert('Connection Error', 'Unable to connect to device.');
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" backgroundColor={Colours.Primary} />
      <View style={HomeStyles.Outer}>
        <View style={HomeStyles.TitleBar}>
          <View style={HomeStyles.TitleOuter}>
            <Text style={HomeStyles.Title}>CycleVision</Text>
          </View>
          <SettingsMenu navigation={navigation} />
        </View>
        <View style={HomeStyles.HomeMainOuter}>
          <TouchableOpacity
            onPress={() => start()}
            style={HomeStyles.HomeStartOuter}>
            <Text style={HomeStyles.StartRideTitle}>Start Ride</Text>
            <Image
              style={HomeStyles.StartRideButton}
              source={require('../resources/StartButton.png')}
            />
          </TouchableOpacity>
          <BatteryIndicator />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Home;

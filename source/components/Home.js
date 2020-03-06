// 3rd Party
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

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
} from '../utilities/Constants';
import FetchWithTimeout from '../utilities/FetchWithTimeout';

function Home({navigation}) {
  const [healthCheckURL, setHealthCheckURL] = useState(null);

  useEffect(() => {
    let setLocalSettings = async () => {
      try {
        const value = await AsyncStorage.getItem(DEVICE_URL_KEY);
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
  }, [setHealthCheckURL]);

  const start = () => {
    if (healthCheckURL !== null) {
      FetchWithTimeout(healthCheckURL, {}, 5000)
        .then(result => {
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

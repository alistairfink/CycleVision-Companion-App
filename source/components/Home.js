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
import {DEVICE_URL_KEY, DEFAULT_DEVICE_IP} from '../utilities/Constants';

function Home({navigation}) {
  useEffect(() => {
    let setLocalSettings = async () => {
      try {
        const value = await AsyncStorage.getItem(DEVICE_URL_KEY);
        if (value === null) {
          await AsyncStorage.setItem(DEVICE_URL_KEY, DEFAULT_DEVICE_IP);
        }
      } catch (e) {
        await AsyncStorage.setItem(DEVICE_URL_KEY, DEFAULT_DEVICE_IP);
      }
    };

    setLocalSettings();
  }, []);
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
            onPress={() => navigation.navigate('StartRide')}
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

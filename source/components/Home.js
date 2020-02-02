// 3rd Party
import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';

// Styles
import HomeStyles from '../styles/HomeStyles';
import SharedStyles from '../styles/SharedStyles';
import Colours from '../styles/Colours';

// Components
import SettingsMenu from './SettingsMenu';

function Home({navigation}) {
  let GetDeviceBattery = () => {
    return '100%';
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
            onPress={() => navigation.navigate('StartRide')}
            style={HomeStyles.HomeStartOuter}>
            <Text style={HomeStyles.StartRideTitle}>Start Ride</Text>
            <Image
              style={HomeStyles.StartRideButton}
              source={require('../resources/StartButton.png')}
            />
          </TouchableOpacity>
          <View style={SharedStyles.Styles.DeviceBatteryOuter}>
            <Image
              style={SharedStyles.Styles.DeviceBatteryIcon}
              source={require('../resources/Battery.png')}
            />
            <Text style={SharedStyles.Styles.DeviceBatteryText}>
              {GetDeviceBattery()}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Home;

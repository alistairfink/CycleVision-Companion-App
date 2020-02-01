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
import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

// Styles
import HomeStyles from '../styles/HomeStyles';
import SharedStyles from '../styles/SharedStyles';
import Colours from '../styles/Colours';

// Components
import SettingsMenu from './SettingsMenu';

function Home() {
  let GetDeviceBattery = () => {
    return '100%';
  };

  return (
    <MenuProvider>
      <SafeAreaView>
        <StatusBar barStyle="light-content" backgroundColor={Colours.Primary} />
        <View style={HomeStyles.Outer}>
          <View style={HomeStyles.TitleBar}>
            <View style={HomeStyles.TitleOuter}>
              <Text style={HomeStyles.Title}>CycleVision</Text>
            </View>
            <SettingsMenu />
          </View>
          <View style={HomeStyles.HomeMainOuter}>
            <Text style={HomeStyles.StartRideTitle}>Start Ride</Text>
            <TouchableOpacity>
              <Image
                style={HomeStyles.StartRideButton}
                source={require('../resources/StartButton.png')}
              />
            </TouchableOpacity>
            <View style={HomeStyles.DeviceBatteryOuter}>
              <Image
                style={HomeStyles.DeviceBatteryIcon}
                source={require('../resources/Battery.png')}
              />
              <Text style={HomeStyles.DeviceBatteryText}>
                {GetDeviceBattery()}
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </MenuProvider>
  );
}

export default Home;

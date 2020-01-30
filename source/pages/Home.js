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
import HomeStyles from '../styles/HomeStyles';

function Home() {
  let GetDeviceBattery = () => {
    return '100%';
  };

  return (
    <MenuProvider>
      <SafeAreaView>
        <StatusBar barStyle="dark-content" />
        <View style={HomeStyles.Outer}>
          <View style={HomeStyles.TitleBar}>
            <View style={HomeStyles.TitleOuter}>
              <Text style={HomeStyles.Title}>CycleVision</Text>
            </View>
            <View style={HomeStyles.SettingsButtonOuter}>
              <Menu>
                <MenuTrigger>
                  <Image
                    style={HomeStyles.SettingsButtonImage}
                    source={require('../resources/SettingsMenuButton.png')}
                  />
                </MenuTrigger>
                <MenuOptions style={HomeStyles.SettingsMenu}>
                  <MenuOption onSelect={() => alert(`Settings`)} text="Settings" />
                </MenuOptions>
              </Menu>
            </View>
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

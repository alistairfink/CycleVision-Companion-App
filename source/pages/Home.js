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
import HomeStyles from '../styles/HomeStyles';

function Home() {
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);

  let GetDeviceBattery = () => {
    return '100%';
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      {settingsMenuOpen && (
        <View style={HomeStyles.SettingsMenu}>
          <TouchableOpacity style={HomeStyles.SettingsOption}>
            <Text>Settings</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={HomeStyles.Outer}>
        <View style={HomeStyles.TitleBar}>
          <View style={HomeStyles.TitleOuter}>
            <Text style={HomeStyles.Title}>CycleVision</Text>
          </View>
          <View style={HomeStyles.SettingsButtonOuter}>
            <TouchableOpacity
              style={HomeStyles.SettingsButton}
              onPress={() => {
                setSettingsMenuOpen(!settingsMenuOpen);
              }}>
              <Image
                style={HomeStyles.SettingsButtonImage}
                source={require('../resources/SettingsMenuButton.png')}
              />
            </TouchableOpacity>
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
  );
}

export default Home;

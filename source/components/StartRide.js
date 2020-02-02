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
  TextInput,
} from 'react-native';

// Styles
import HomeStyles from '../styles/HomeStyles';
import StartRideStyles from '../styles/StartRideStyles';
import SharedStyles from '../styles/SharedStyles';
import Colours from '../styles/Colours';

// Components
import SettingsMenu from './SettingsMenu';
import BackButton from './BackButton';

function StartRide({navigation}) {
  const [destinationInput, setDestinationInput] = useState("");
  
  let GetDeviceBattery = () => {
    return '100%';
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" backgroundColor={Colours.Primary} />
      <View style={StartRideStyles.Outer}>
        <View style={StartRideStyles.TopBar}>
          <View style={StartRideStyles.BackOuter}>
            <BackButton navigation={navigation} />
          </View>
          <SettingsMenu navigation={navigation} />
        </View>
        <View style={StartRideStyles.MainOuter}>
          <View style={StartRideStyles.WithNavigationOuter}>
            <Text style={StartRideStyles.WithNavigationText}>
              Enter Destination
            </Text>
            <TextInput
            style={StartRideStyles.DestinationInput}
              onChangeText={text => setDestinationInput(text)}
              value={destinationInput}
            />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={StartRideStyles.WithoutNavigationButton}>
            <Text style={StartRideStyles.WithoutNavigationButtonText}>
              Continue Without Navigation
            </Text>
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

export default StartRide;

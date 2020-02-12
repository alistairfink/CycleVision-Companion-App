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

// Utilities
import GoogleApiUtility from '../utilities/GoogleApiUtility';

function StartRide({navigation}) {
  const [destinationInput, setDestinationInput] = useState('');
  const [possibleDestinations, setPossibleDestinations] = useState([]);

  let GetDeviceBattery = () => {
    return '100%';
  };

  const UpdateDestination = async destination => {
    setDestinationInput(destination);
    if (destination === '') {
      setPossibleDestinations([]);
    } else {
      let response = await GoogleApiUtility.SearchNearby(
        'mels',
        43.478061,
        -80.537507,
      );

      setPossibleDestinations(response.results);
    }
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
              onChangeText={text => UpdateDestination(text)}
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

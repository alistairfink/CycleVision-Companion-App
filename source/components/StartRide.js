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
  PermissionsAndroid,
} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import Geolocation from '@react-native-community/geolocation';
import wifi from 'react-native-android-wifi';

// Styles
import HomeStyles from '../styles/HomeStyles';
import StartRideStyles from '../styles/StartRideStyles';
import SharedStyles from '../styles/SharedStyles';
import Colours from '../styles/Colours';

// Components
import SettingsMenu from './SettingsMenu';
import BackButton from './BackButton';
import BatteryIndicator from './BatteryIndicator';

// Utilities
import GoogleApiUtility from '../utilities/GoogleApiUtility';

function StartRide({navigation}) {
  const [destinationInput, setDestinationInput] = useState('');
  const [possibleDestinations, setPossibleDestinations] = useState([]);

  const UpdateDestination = async destination => {
    setDestinationInput(destination);
    if (destination === '') {
      setPossibleDestinations([]);
    } else {
      wifi.forceWifiUsage(false);
      let permRequest = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Accessing Permission',
          message: 'CycleVision needs your location for navigation.',
          buttonPositive: 'OK',
        },
      );

      if (permRequest === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(info => {
          GoogleApiUtility.SearchNearby(
            destination,
            info.coords.latitude,
            info.coords.longitude,
          ).then(response => {
            setPossibleDestinations(response.results);
          });
        });
      }
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
            <Autocomplete
              autoCapitalize="none"
              autoCorrect={false}
              inputContainerStyle={StartRideStyles.DestinationInput}
              listContainerStyle={StartRideStyles.SuggestionList}
              data={possibleDestinations}
              defaultValue={destinationInput}
              onChangeText={text => UpdateDestination(text)}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('NavigationFlow', {
                      Destination: item,
                    })
                  }
                  style={StartRideStyles.SuggestionItem}>
                  <Text style={StartRideStyles.SuggestionItemName}>
                    {item.name}
                  </Text>
                  <Text style={StartRideStyles.SuggestionItemAddress}>
                    {item.vicinity}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('WithoutNavigationFlow')}
            style={StartRideStyles.WithoutNavigationButton}>
            <Text style={StartRideStyles.WithoutNavigationButtonText}>
              Continue Without Navigation
            </Text>
          </TouchableOpacity>
          <BatteryIndicator />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default StartRide;

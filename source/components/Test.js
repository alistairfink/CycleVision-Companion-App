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
  StyleSheet,
  PermissionsAndroid,
} from 'react-native';

// Components
import Colours from '../styles/Colours';
import NavigationView from './NavigationView';

const t = StyleSheet.create({
  test: {
    backgroundColor: 'red',
    height: '100%',
    padding: 20,
  },
  test2: {
    color: 'blue',
  },
});

function Test() {
  const [grant, setGrant] = useState(false);

  useEffect(() => {
    if (!grant) {
      requestPermissions();
    }
  }, [requestPermissions]);

  const requestPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'ACCESS_FINE_LOCATION',
          message: 'Mapbox navigation needs ACCESS_FINE_LOCATION',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setGrant(true);
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" backgroundColor={Colours.Primary} />
      <View style={t.test}>{grant && <NavigationView />}</View>
    </SafeAreaView>
  );
}

export default Test;

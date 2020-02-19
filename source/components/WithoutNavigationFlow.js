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
  PermissionsAndroid,
} from 'react-native';
import ScreenBrightness from 'react-native-screen-brightness';

// Styles
import SharedStyles from '../styles/SharedStyles';
import Colours from '../styles/Colours';
import WithoutNavigationFlowStyles from '../styles/WithoutNavigationFlowStyles';

// Components
import SettingsMenu from './SettingsMenu';
import BatteryIndicator from './BatteryIndicator';
import BackButton from './BackButton';

function WithoutNavigationFlow({navigation}) {
  const [originalBrightness, setOriginalBrightness] = useState(1);
  const [currBrightness, setCurrBrightness] = useState(null);

  useEffect(() => {
    let inner = async () => {
      let permRequest = await PermissionsAndroid.request(
        'android.permission.WRITE_SETTINGS',
        {
          title: 'Write Settings Permissions',
          message:
            'CycleVision needs to set your brightness to conserve battery.',
          buttonPositive: 'OK',
        },
      );

      console.log(permRequest);
      if (permRequest === PermissionsAndroid.RESULTS.GRANTED) {
        ScreenBrightness.getBrightness().then(brightness => {
          setOriginalBrightness(brightness / 255);
          ScreenBrightness.setBrightness(0);
        });
      }
    };

    inner();
  }, [setOriginalBrightness]);

  useEffect(() => {
    ScreenBrightness.getBrightness().then(brightness => {
      setCurrBrightness(brightness);
    });
  });

  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" backgroundColor={Colours.Primary} />
      <View style={WithoutNavigationFlowStyles.Outer}>
        <View style={WithoutNavigationFlowStyles.Header}>
          <View style={WithoutNavigationFlowStyles.BackOuter}>
            <BackButton navigation={navigation} />
          </View>
          <SettingsMenu navigation={navigation} />
        </View>
        <View style={WithoutNavigationFlowStyles.EmptyBody} />
        <View style={WithoutNavigationFlowStyles.Footer}>
          <View style={WithoutNavigationFlowStyles.FooterLeft}>
            <BatteryIndicator />
          </View>
          <View style={WithoutNavigationFlowStyles.FooterRight}>
            <TouchableOpacity
              style={WithoutNavigationFlowStyles.EndRideOuter}
              onPress={() => endRide()}>
              <Text style={WithoutNavigationFlowStyles.EndRideText}>
                End Ride{currBrightness}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default WithoutNavigationFlow;

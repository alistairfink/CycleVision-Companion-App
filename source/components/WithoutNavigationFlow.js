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
  NativeModules,
} from 'react-native';

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
    let inner = async () => {};

    inner();
  }, [setOriginalBrightness]);

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
              onPress={() => navigation.navigate('RideFinished')}>
              <Text style={WithoutNavigationFlowStyles.EndRideText}>
                End Ride
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default WithoutNavigationFlow;

// 3rd Party
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Alert,
  Image,
  PermissionsAndroid,
  NativeModules,
  BackHandler,
} from 'react-native';
import SystemSetting from 'react-native-system-setting';

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
  const dimBrightness = 0.0;

  useEffect(() => {
    SystemSetting.getBrightness().then(brightness => {
      setOriginalBrightness(brightness);
    });

    setBrightness();
    BackHandler.addEventListener('hardwareBackPress', resetBrightness);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', resetBrightness);
    };
  }, [setOriginalBrightness, setBrightness, resetBrightness]);

  const setBrightness = () => {
    SystemSetting.setBrightnessForce(dimBrightness).then(success => {
      !success &&
        Alert.alert(
          'Permission Deny',
          'You have no permission changing settings',
          [
            {text: 'Ok', style: 'cancel'},
            {
              text: 'Open Setting',
              onPress: () => SystemSetting.grantWriteSettingPermission(),
            },
          ],
        );
    });
  };

  const resetBrightness = () => {
    SystemSetting.setBrightnessForce(originalBrightness).then(success => {
      !success &&
        Alert.alert(
          'Permission Deny',
          'You have no permission changing settings',
          [
            {text: 'Ok', style: 'cancel'},
            {
              text: 'Open Setting',
              onPress: () => SystemSetting.grantWriteSettingPermission(),
            },
          ],
        );
    });
  };

  const navigateToRideFinished = () => {
    resetBrightness();
    navigation.navigate('RideFinished');
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" backgroundColor={Colours.Primary} />
      <View style={WithoutNavigationFlowStyles.Outer}>
        <View style={WithoutNavigationFlowStyles.Header}>
          <View style={WithoutNavigationFlowStyles.BackOuter}>
            <BackButton
              navigation={navigation}
              override={() => resetBrightness()}
            />
          </View>
          <SettingsMenu
            navigation={navigation}
            override={() => resetBrightness()}
            goBackOverride={() => setBrightness()}
          />
        </View>
        <View style={WithoutNavigationFlowStyles.EmptyBody} />
        <View style={WithoutNavigationFlowStyles.Footer}>
          <View style={WithoutNavigationFlowStyles.FooterLeft}>
            <BatteryIndicator />
          </View>
          <View style={WithoutNavigationFlowStyles.FooterRight}>
            <TouchableOpacity
              style={WithoutNavigationFlowStyles.EndRideOuter}
              onPress={() => navigateToRideFinished()}>
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

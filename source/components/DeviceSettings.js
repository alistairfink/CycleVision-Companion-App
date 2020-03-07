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
  BackHandler,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Dialog from 'react-native-dialog';

// Styles
import SettingsStyles from '../styles/SettingsStyles';
import Colours from '../styles/Colours';

// Components
import BackButton from './BackButton';

// Utilities
import {DEVICE_SSID_KEY, DEVICE_PASS_KEY} from '../utilities/Constants';

function DeviceSettings({navigation}) {
  const [showDeviceNetworkWindow, setShowDeviceNetworkWindow] = useState(false);
  const [deviceSSID, setDeviceSSID] = useState('');
  const [devicePass, setDevicePass] = useState('');

  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" backgroundColor={Colours.Primary} />
      <View style={SettingsStyles.Outer}>
        <View style={SettingsStyles.TitleBar}>
          <BackButton navigation={navigation} />
          <View style={SettingsStyles.TitleOuter}>
            <Text style={SettingsStyles.Title}>Device Settings</Text>
          </View>
        </View>
        <ScrollView>
          <TouchableOpacity
            style={SettingsStyles.SettingsItem}
            onPress={async () => {
              const ssid = await AsyncStorage.getItem(DEVICE_SSID_KEY);
              const pass = await AsyncStorage.getItem(DEVICE_PASS_KEY);
              setDeviceSSID(ssid);
              setDevicePass(pass);
              setShowDeviceNetworkWindow(true);
            }}>
            <Image
              style={SettingsStyles.SettingsItemImage}
              source={require('../resources/Wifi.png')}
            />
            <View style={SettingsStyles.SettingsItemTitleOuter}>
              <Text style={SettingsStyles.SettingsItemTitle}>
                Device Network
              </Text>
              <Text style={SettingsStyles.SettingsItemSubTitle}>
                Change Device SSID and Password
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
        <Dialog.Container visible={showDeviceNetworkWindow}>
          <Dialog.Title>Change Device Network Settings</Dialog.Title>
          <View>
            <Dialog.Description>SSID</Dialog.Description>
            <Dialog.Input
              style={SettingsStyles.InputDialogBox}
              onChangeText={text => setDeviceSSID(text)}
              value={deviceSSID}
            />
            <Dialog.Description>Pass</Dialog.Description>
            <Dialog.Input
              style={SettingsStyles.InputDialogBox}
              onChangeText={text => setDevicePass(text)}
              value={devicePass}
            />
          </View>
          <Dialog.Button
            label="Cancel"
            onPress={() => setShowDeviceNetworkWindow(false)}
          />
          <Dialog.Button
            label="OK"
            onPress={async () => {
              await AsyncStorage.setItem(DEVICE_SSID_KEY, deviceSSID);
              await AsyncStorage.setItem(DEVICE_PASS_KEY, devicePass);
              setShowDeviceNetworkWindow(false);
            }}
          />
        </Dialog.Container>
      </View>
    </SafeAreaView>
  );
}

export default DeviceSettings;

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
import {DEVICE_URL_KEY} from '../utilities/Constants';

function DebugSettings({navigation}) {
  const [showDeviceIPWindow, setShowDeviceIPWindow] = useState(false);
  const [deviceIP, setDeviceIP] = useState('');

  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" backgroundColor={Colours.Primary} />
      <View style={SettingsStyles.Outer}>
        <View style={SettingsStyles.TitleBar}>
          <BackButton navigation={navigation} />
          <View style={SettingsStyles.TitleOuter}>
            <Text style={SettingsStyles.Title}>Debug Settings</Text>
          </View>
        </View>
        <ScrollView>
          <TouchableOpacity
            style={SettingsStyles.SettingsItem}
            onPress={async () => {
              const ip = await AsyncStorage.getItem(DEVICE_URL_KEY);
              setDeviceIP(ip);
              setShowDeviceIPWindow(true);
            }}>
            <Image
              style={SettingsStyles.SettingsItemImage}
              source={require('../resources/Info.png')}
            />
            <View style={SettingsStyles.SettingsItemTitleOuter}>
              <Text style={SettingsStyles.SettingsItemTitle}>Device IP</Text>
              <Text style={SettingsStyles.SettingsItemSubTitle}>
                Change Device IP
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
        <Dialog.Container visible={showDeviceIPWindow}>
          <Dialog.Title>Change Device IP</Dialog.Title>
          <Dialog.Input
            style={SettingsStyles.InputDialogBox}
            onChangeText={text => setDeviceIP(text)}
            value={deviceIP}
          />
          <Dialog.Button
            label="Cancel"
            onPress={() => setShowDeviceIPWindow(false)}
          />
          <Dialog.Button
            label="OK"
            onPress={async () => {
              await AsyncStorage.setItem(DEVICE_URL_KEY, deviceIP);
              setShowDeviceIPWindow(false);
            }}
          />
        </Dialog.Container>
      </View>
    </SafeAreaView>
  );
}

export default DebugSettings;

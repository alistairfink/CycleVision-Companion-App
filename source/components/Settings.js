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

// Styles
import SettingsStyles from '../styles/SettingsStyles';
import Colours from '../styles/Colours';

// Components
import BackButton from './BackButton';

function Settings({navigation}) {
  const override = navigation.getParam('override');

  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" backgroundColor={Colours.Primary} />
      <View style={SettingsStyles.Outer}>
        <View style={SettingsStyles.TitleBar}>
          <BackButton navigation={navigation} override={override} />
          <View style={SettingsStyles.TitleOuter}>
            <Text style={SettingsStyles.Title}>Settings</Text>
          </View>
        </View>
        <ScrollView>
          <TouchableOpacity style={SettingsStyles.SettingsItem}>
            <Image
              style={SettingsStyles.SettingsItemImage}
              source={require('../resources/Navigation.png')}
            />
            <View style={SettingsStyles.SettingsItemTitleOuter}>
              <Text style={SettingsStyles.SettingsItemTitle}>Navigation</Text>
              <Text style={SettingsStyles.SettingsItemSubTitle}>
                Maps and Navigation Settings
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={SettingsStyles.SettingsItem}
            onPress={() => navigation.navigate('DeviceSettings')}>
            <Image
              style={SettingsStyles.SettingsItemImage}
              source={require('../resources/Device.png')}
            />
            <View style={SettingsStyles.SettingsItemTitleOuter}>
              <Text style={SettingsStyles.SettingsItemTitle}>Device</Text>
              <Text style={SettingsStyles.SettingsItemSubTitle}>
                Device and Network Settings
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={SettingsStyles.SettingsItem}>
            <Image
              style={SettingsStyles.SettingsItemImage}
              source={require('../resources/Data.png')}
            />
            <View style={SettingsStyles.SettingsItemTitleOuter}>
              <Text style={SettingsStyles.SettingsItemTitle}>Statistics</Text>
              <Text style={SettingsStyles.SettingsItemSubTitle}>
                Ant+ and Statistic Settings
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={SettingsStyles.SettingsItem}>
            <Image
              style={SettingsStyles.SettingsItemImage}
              source={require('../resources/Account.png')}
            />
            <View style={SettingsStyles.SettingsItemTitleOuter}>
              <Text style={SettingsStyles.SettingsItemTitle}>Account</Text>
              <Text style={SettingsStyles.SettingsItemSubTitle}>
                User Account Settings
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={SettingsStyles.SettingsItem}>
            <Image
              style={SettingsStyles.SettingsItemImage}
              source={require('../resources/Info.png')}
            />
            <View style={SettingsStyles.SettingsItemTitleOuter}>
              <Text style={SettingsStyles.SettingsItemTitle}>About</Text>
              <Text style={SettingsStyles.SettingsItemSubTitle}>
                Device and App Information
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={SettingsStyles.SettingsItem}
            onPress={() => navigation.navigate('DebugSettings')}>
            <Image
              style={SettingsStyles.SettingsItemImage}
              source={require('../resources/Info.png')}
            />
            <View style={SettingsStyles.SettingsItemTitleOuter}>
              <Text style={SettingsStyles.SettingsItemTitle}>Debug</Text>
              <Text style={SettingsStyles.SettingsItemSubTitle}>
                Remove this.
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default Settings;

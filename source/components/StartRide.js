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
} from 'react-native';

// Styles
import HomeStyles from '../styles/HomeStyles';
import SharedStyles from '../styles/SharedStyles';
import Colours from '../styles/Colours';

// Components
import SettingsMenu from './SettingsMenu';

function StartRide({navigation}) {
  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" backgroundColor={Colours.Primary} />
      <View>
        <Text> Test</Text>
        <SettingsMenu navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}

export default StartRide;

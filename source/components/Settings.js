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
import Colours from '../styles/Colours';

// Components

function Home() {
  let GetDeviceBattery = () => {
    return '100%';
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" backgroundColor={Colours.Primary} />
      <View>
        <Text>Test</Text>
      </View>
    </SafeAreaView>
  );
}

export default Home;

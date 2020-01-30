import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import HomeStyles from '../styles/HomeStyles';

function Home() {
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <View style={HomeStyles.Outer}>
        <View style={HomeStyles.TitleBar}>
          <Text style={HomeStyles.Title}>CycleVision</Text>
          <TouchableOpacity style={HomeStyles.SettingsButtonOuter}>
            <Image
              style={HomeStyles.SettingsButton}
              source={require('../resources/SettingsMenuButton.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Home;

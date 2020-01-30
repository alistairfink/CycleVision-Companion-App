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
          <View style={HomeStyles.TitleOuter}>
            <Text style={HomeStyles.Title}>CycleVision</Text>
          </View>
          <View style={HomeStyles.SettingsButtonOuter}>
            <TouchableOpacity style={HomeStyles.SettingsButton}>
              <Image
                style={HomeStyles.SettingsButtonImage}
                source={require('../resources/SettingsMenuButton.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Home;

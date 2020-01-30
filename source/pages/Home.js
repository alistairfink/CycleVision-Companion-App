import React from 'react';
import {SafeAreaView, ScrollView, View, Text, StatusBar} from 'react-native';
import HomeStyles from '../styles/HomeStyles';

function Home() {
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text>Test</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;

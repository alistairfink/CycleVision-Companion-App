import React from 'react';
import {SafeAreaView, ScrollView, View, Text, StatusBar} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import AppStyles from '../styles/AppStyles';

function App() {
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={AppStyles.scrollView}>
        <Header />
        {global.HermesInternal == null ? null : (
          <View style={AppStyles.engine}>
            <Text style={AppStyles.footer}>Engine: Hermes</Text>
          </View>
        )}
        <View style={AppStyles.body}>
          <View style={AppStyles.sectionContainer}>
            <Text style={AppStyles.sectionTitle}>Step One</Text>
            <Text style={AppStyles.sectionDescription}>
              Edit <Text style={AppStyles.highlight}>App.js</Text> to change
              this screen and then come back to see your edits.
            </Text>
          </View>
          <View style={AppStyles.sectionContainer}>
            <Text style={AppStyles.sectionTitle}>See Your Changes</Text>
            <Text style={AppStyles.sectionDescription}>
              <ReloadInstructions />
            </Text>
          </View>
          <View style={AppStyles.sectionContainer}>
            <Text style={AppStyles.sectionTitle}>Debug</Text>
            <Text style={AppStyles.sectionDescription}>
              <DebugInstructions />
            </Text>
          </View>
          <View style={AppStyles.sectionContainer}>
            <Text style={AppStyles.sectionTitle}>Learn More</Text>
            <Text style={AppStyles.sectionDescription}>
              Read the docs to discover what to do next:
            </Text>
          </View>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;

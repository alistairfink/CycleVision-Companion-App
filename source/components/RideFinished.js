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
	TextInput,
	PermissionsAndroid,
	UIManager,
	findNodeHandle,
	requireNativeComponent,
	BackHandler,
} from 'react-native';

// Styles
import Colours from '../styles/Colours';

// Components
import BatteryIndicator from './BatteryIndicator';

function RideFinished({navigation}) {
	useEffect(() => {
		BackHandler.addEventListener('hardwareBackPress', backButtonHandler);

		return () => {
			BackHandler.removeEventListener('hardwareBackPress', backButtonHandler);
		};
	}, [backButtonHandler]);

	let backButtonHandler = () => {
		navigation.navigate('Home');
		return true	
	};

	return (
		<SafeAreaView>
			<StatusBar barStyle="light-content" backgroundColor={Colours.Primary} />
		</SafeAreaView>
	);
}

export default RideFinished;

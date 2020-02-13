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
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

function NavigationFlow({navigation}) {
	const Destination = navigation.getParam('Destination');
	const [origin, setOrigin] = useState(null);
	useEffect(() => {
		let inner = async () => {
			let permRequest = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
				{
					title: 'Location Accessing Permission',
					message: 'CycleVision needs your location for navigation.',
					buttonPositive: 'OK',
				},
			);

			if (permRequest === PermissionsAndroid.RESULTS.GRANTED) {
				Geolocation.getCurrentPosition(info => {
					setOrigin(info.coords);
				});
			}
		};

		inner();
	}, [setOrigin]);

	return (
		<SafeAreaView>
			<View>
				<Text>{JSON.stringify(Destination)}</Text>
				<Text>{JSON.stringify(origin)}</Text>
			</View>
		</SafeAreaView>
	);
}

export default NavigationFlow;

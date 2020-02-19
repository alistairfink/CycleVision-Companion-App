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

// Components
import Colours from '../styles/Colours';
import NavigationView from './NavigationView';

function NavigationFlow({navigation}) {
	const Destination = navigation.getParam('Destination');
	const [navObject, setNavObject] = useState(null);

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
					setNavObject({
						Destination: {
							lat: Destination.geometry.location.lat,
							long: Destination.geometry.location.lng,
						},
						Origin: {
							lat: info.coords.latitude,
							long: info.coords.longitude,
						},
					});
				});
			}
		};

		inner();
	}, [setNavObject]);

	return (
		<SafeAreaView>
			<StatusBar barStyle="light-content" backgroundColor={Colours.Primary} />
			<Text>{(navObject == null).toString()}</Text>
			<Text>{JSON.stringify(navObject)}</Text>
			<View>
				<View
					style={{
						backgroundColor: 'red',
						height: '100%',
						padding: 20,
					}}>
					{navObject != null && (
						<NavigationView
							style={{
								backgroundColor: 'gainsboro',
								flex: 1,
							}}
							destination={navObject.Destination}
							origin={navObject.Origin}
						/>
					)}
				</View>
			</View>
		</SafeAreaView>
	);
}

export default NavigationFlow;

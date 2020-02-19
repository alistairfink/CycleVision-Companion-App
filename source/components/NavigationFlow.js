// 3rd Party
import React, {useState, useEffect, useRef} from 'react';
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
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

// Styles
import NavigationView from './NavigationView';
import Colours from '../styles/Colours';
import NavigationFlowStyles from '../styles/NavigationFlowStyles';

// Components
import BatteryIndicator from './BatteryIndicator';
import BackButton from './BackButton';
import SettingsMenu from './SettingsMenu';

function NavigationFlow({navigation}) {
	const Destination = navigation.getParam('Destination');
	const [navObject, setNavObject] = useState(null);

	const _nav = useRef(null);

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

	let endRide = () => {
		_nav.current.stopNavigation();
	};

	return (
		<SafeAreaView>
			<StatusBar barStyle="light-content" backgroundColor={Colours.Primary} />
			<View style={NavigationFlowStyles.Outer}>
				<View style={NavigationFlowStyles.Header}>
					<View style={NavigationFlowStyles.BackOuter}>
						<BackButton navigation={navigation} />
					</View>
					<SettingsMenu navigation={navigation} />
				</View>
				<View style={NavigationFlowStyles.Content}>
					<View ref={_nav} style={NavigationFlowStyles.NavigationOuter}>
						{navObject != null && (
							<NavigationView
								ref={_nav}
								style={NavigationFlowStyles.Navigation}
								destination={navObject.Destination}
								origin={navObject.Origin}
							/>
						)}
					</View>
				</View>
				<View style={NavigationFlowStyles.Footer}>
					<View style={NavigationFlowStyles.FooterLeft}>
						<BatteryIndicator />
					</View>
					<View style={NavigationFlowStyles.FooterRight}>
						<TouchableOpacity
							style={NavigationFlowStyles.EndRideOuter}
							onPress={() => endRide()}>
							<Text style={NavigationFlowStyles.EndRideText}>End Ride</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
}

export default NavigationFlow;

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
	BackHandler,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-community/async-storage';
import RNEventSource from 'react-native-event-source';
import wifi from 'react-native-android-wifi';

// Styles
import SharedStyles from '../styles/SharedStyles';
import NavigationView from './NavigationView';
import Colours from '../styles/Colours';
import NavigationFlowStyles from '../styles/NavigationFlowStyles';

// Components
import BatteryIndicator from './BatteryIndicator';
import BackButton from './BackButton';
import SettingsMenu from './SettingsMenu';
import VideoView from './VideoView';

// Utilities
import {
	DEVICE_URL_KEY,
	VIDEO_API,
	DEFAULT_DEVICE_IP,
	EVENT_API,
} from '../utilities/Constants';

function NavigationFlow({navigation, startTime}) {
	const Destination = navigation.getParam('Destination');
	const StartTime = navigation.getParam('StartTime');
	const [navObject, setNavObject] = useState(null);
	const [videoURL, setVideoURL] = useState(null);
	const [showVideo, setShowVideo] = useState(false);

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

		let es = null;
		let getURL = async () => {
			const baseIP = await AsyncStorage.getItem(DEVICE_URL_KEY);
			if (baseIP === null) {
				baseIP = DEFAULT_DEVICE_IP;
			}

			setVideoURL(baseIP + VIDEO_API);
			await inner();
			es = new RNEventSource(baseIP + EVENT_API);
			es.addEventListener('message', data => {
				handleEvent(data.data);
			});
		};

		getURL();
		BackHandler.addEventListener('hardwareBackPress', stopNavigation);

		return () => {
			BackHandler.removeEventListener('hardwareBackPress', stopNavigation);
			if (es !== null) {
				es.removeAllListeners();
				es.close();
			}
		};
	}, [setNavObject, setVideoURL]);

	let endRide = () => {
		stopNavigation();
		navigation.navigate('RideFinished', {
			StartTime: StartTime,
		});
	};

	let stopNavigation = () => {
		_nav.current.stopNavigation();
	};

	const handleEvent = data => {
		if (data === 'True') {
			wifi.forceWifiUsage(true);
			setShowVideo(true);
		} else if (data === 'False') {
			wifi.forceWifiUsage(false);
			setShowVideo(false);
		}
	};

	return (
		<SafeAreaView>
			<StatusBar barStyle="light-content" backgroundColor={Colours.Primary} />
			<View style={NavigationFlowStyles.Outer}>
				<View style={NavigationFlowStyles.Header}>
					<View style={NavigationFlowStyles.BackOuter}>
						<BackButton
							navigation={navigation}
							override={() => stopNavigation()}
						/>
					</View>
					<TouchableOpacity
						style={SharedStyles.Styles.CameraButtonOuter}
						onPress={() => {
							showVideo ? handleEvent('False') : handleEvent('True');
						}}>
						<Image
							style={SharedStyles.Styles.CameraButton}
							source={require('../resources/Camera.png')}
						/>
					</TouchableOpacity>
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
						{showVideo && videoURL !== null && (
							<VideoView videoURL={videoURL} />
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

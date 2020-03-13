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
import RideFinishedStyles from '../styles/RideFinishedStyles';
import wifi from 'react-native-android-wifi';

// Components
import BatteryIndicator from './BatteryIndicator';

function RideFinished({navigation}) {
	const StartTime = navigation.getParam('StartTime');
	const [stats, setStats] = useState({
		Distance: '0 km',
		Speed: '0 km/h',
		Time: '10 hours',
	});

	useEffect(() => {
		let distance = '0 km';
		let speed = '0 km/h';
		let time = formatTime();
		updateStats(distance, speed, time);
		BackHandler.addEventListener('hardwareBackPress', backButtonHandler);

		return () => {
			BackHandler.removeEventListener('hardwareBackPress', backButtonHandler);
		};
	}, [backButtonHandler, formatTime, updateStats]);

	let formatTime = () => {
		let EndTime = new Date();
		let diff = new Date(EndTime - StartTime);
		let hours = diff.getUTCHours();
		let timeStr = '';
		if (hours > 0) {
			timeStr += hours.toString(10) + 'h ';
		}

		let minutes = diff.getUTCMinutes();
		if (minutes > 0) {
			timeStr += minutes.toString(10) + 'm ';
		}

		let seconds = diff.getUTCSeconds();
		timeStr += seconds.toString(10) + 's';
		return timeStr;
	};

	let updateStats = (distance, speed, time) => {
		setStats({
			Distance: distance,
			Speed: speed,
			Time: time,
		});
	};

	let backButtonHandler = () => {
		wifi.forceWifiUsage(true);
		navigateBack();
		return true;
	};

	let navigateBack = () => {
		wifi.forceWifiUsage(true);
		navigation.navigate('Home');
	};

	return (
		<SafeAreaView>
			<StatusBar barStyle="light-content" backgroundColor={Colours.Primary} />
			<View style={RideFinishedStyles.Outer}>
				<View style={RideFinishedStyles.Header}>
					<View style={RideFinishedStyles.TitleOuter}>
						<Text style={RideFinishedStyles.Title}>Ride Summary</Text>
					</View>
					<TouchableOpacity onPress={() => navigateBack()}>
						<Image
							style={RideFinishedStyles.ExitImg}
							source={require('../resources/Close.png')}
						/>
					</TouchableOpacity>
				</View>
				<View style={RideFinishedStyles.Content}>
					<View style={RideFinishedStyles.MainContent}>
						<View style={RideFinishedStyles.ContentRow}>
							<Image
								style={RideFinishedStyles.ContentRowImage}
								source={require('../resources/TripDistance.png')}
							/>
							<View style={RideFinishedStyles.ContentText}>
								<Text style={RideFinishedStyles.ContentRowTitle}>
									Distance Travelled
								</Text>
								<Text style={RideFinishedStyles.ContentRowTitleSubText}>
									{stats.Distance}
								</Text>
							</View>
						</View>
						<View style={RideFinishedStyles.ContentRow}>
							<Image
								style={RideFinishedStyles.ContentRowImage}
								source={require('../resources/TripSpeed.png')}
							/>
							<View style={RideFinishedStyles.ContentText}>
								<Text style={RideFinishedStyles.ContentRowTitle}>
									Average Speed
								</Text>
								<Text style={RideFinishedStyles.ContentRowTitleSubText}>
									{stats.Speed}
								</Text>
							</View>
						</View>
						<View style={RideFinishedStyles.ContentRow}>
							<Image
								style={RideFinishedStyles.ContentRowImage}
								source={require('../resources/TripLength.png')}
							/>
							<View style={RideFinishedStyles.ContentText}>
								<Text style={RideFinishedStyles.ContentRowTitle}>
									Trip Time
								</Text>
								<Text style={RideFinishedStyles.ContentRowTitleSubText}>
									{stats.Time}
								</Text>
							</View>
						</View>
					</View>
					<BatteryIndicator />
				</View>
			</View>
		</SafeAreaView>
	);
}

export default RideFinished;

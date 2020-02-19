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

// Components
import BatteryIndicator from './BatteryIndicator';

function RideFinished({navigation}) {
	const [stats, setStats] = useState({
		Distance: '100 km',
		Speed: '10 km/h',
		Length: '10 hours',
	});

	useEffect(() => {
		BackHandler.addEventListener('hardwareBackPress', backButtonHandler);

		return () => {
			BackHandler.removeEventListener('hardwareBackPress', backButtonHandler);
		};
	}, [backButtonHandler]);

	let backButtonHandler = () => {
		navigateBack();
		return true;
	};

	let navigateBack = () => {
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
									Trip Length
								</Text>
								<Text style={RideFinishedStyles.ContentRowTitleSubText}>
									{stats.Length}
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

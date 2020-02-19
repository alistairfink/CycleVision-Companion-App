// 3rd Party
import React from 'react';
import {View, Image, Text} from 'react-native';

// Styles
import SharedStyles from '../styles/SharedStyles';

function BatteryIndicator() {
	let GetDeviceBattery = () => {
		return '100%';
	};

	return (
		<View style={SharedStyles.Styles.DeviceBatteryOuter}>
			<Image
				style={SharedStyles.Styles.DeviceBatteryIcon}
				source={require('../resources/Battery.png')}
			/>
			<Text style={SharedStyles.Styles.DeviceBatteryText}>
				{GetDeviceBattery()}
			</Text>
		</View>
	);
}

export default BatteryIndicator;

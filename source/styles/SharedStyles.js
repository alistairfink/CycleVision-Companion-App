import {StyleSheet} from 'react-native';
import Colours from './Colours';

const SharedStyles = {
	Styles: StyleSheet.create({
		SettingsButtonOuter: {
			justifyContent: 'center',
			marginRight: 10,
		},
		SettingsButtonImage: {
			height: 35,
			width: 35,
		},
		BackButtonOuter: {
			justifyContent: 'center',
			marginLeft: 15,
			marginRight: 20,
		},
		BackButtonImage: {
			height: 35,
			width: 35,
		},
		DeviceBatteryOuter: {
			flexDirection: 'row',
		},
		DeviceBatteryIcon: {
			height: 20,
			width: 20,
		},
		DeviceBatteryText: {
			fontSize: 15,
			marginBottom: 10,
			color: Colours.Secondary,
		},
		VideoOuter: {
			backgroundColor: 'transparent',
		},
		CameraButtonOuter: {
			justifyContent: 'center',
			marginRight: 30,
		},
		CameraButton: {
			height: 35,
			width: 35,
		},
	}),
	SettingsMenu: {
		optionsWrapper: StyleSheet.create({
			padding: 10,
		}),
		optionText: StyleSheet.create({
			fontSize: 15,
		}),
	},
};

export default SharedStyles;

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
			height: 40,
			width: 40,
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

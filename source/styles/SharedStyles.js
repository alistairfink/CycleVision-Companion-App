import {StyleSheet} from 'react-native';
import Colours from './Colours';

const SharedStyles = {
	Styles: StyleSheet.create({
		SettingsButtonOuter: {
			justifyContent: 'center',
		},
		SettingsButtonImage: {
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

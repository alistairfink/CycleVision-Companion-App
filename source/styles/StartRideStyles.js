import {StyleSheet} from 'react-native';
import Colours from './Colours';

const StartRideStyles = StyleSheet.create({
	Outer: {
		height: '100%',
		width: '100%',
		backgroundColor: Colours.Primary,
	},
	TopBar: {
		height: '20%',
		flexDirection: 'row',
	},
	BackOuter: {
		flex: 1,
		justifyContent: 'center',
	},
	MainOuter: {
		height: '80%',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	WithNavigationOuter: {
		flex: 1,
		width: '100%',
		marginLeft: 0,
		marginRight: 0,
		justifyContent: 'center',
	},
	WithNavigationText: {
		color: Colours.Secondary,
		fontSize: 25,
		marginLeft: 30,
		marginRight: 30,
	},
	DestinationInput: {
		backgroundColor: Colours.Secondary,
		borderRadius: 5,
		marginLeft: 30,
		marginRight: 30,
	},
	WithoutNavigationButton: {
		marginBottom: '30%',
	},
	WithoutNavigationButtonText: {
		color: Colours.Secondary,
		fontSize: 25,
		marginLeft: 30,
		marginRight: 30,
		textAlign: 'center',
	},
});

export default StartRideStyles;

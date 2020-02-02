// 3rd Party
import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator, TransitionPresets} from 'react-navigation-stack';
import {MenuProvider} from 'react-native-popup-menu';

// Components
import Home from './Home';
import Settings from './Settings';
import StartRide from './StartRide';

const Navigator = createStackNavigator(
	{
		Home: {screen: Home},
		Settings: {screen: Settings},
		StartRide: {screen: StartRide},
	},
	{
		headerMode: 'none',
		initialRouteName: 'Home',
		defaultNavigationOptions: {
			...TransitionPresets.SlideFromRightIOS,
		},
	},
);

const AppContainer = createAppContainer(Navigator);

function App() {
	return (
		<MenuProvider>
			<AppContainer />
		</MenuProvider>
	);
}

export default App;
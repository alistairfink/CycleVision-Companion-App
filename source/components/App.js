// 3rd Party
import {createAppContainer} from 'react-navigation';
import {createStackNavigator, TransitionPresets} from 'react-navigation-stack';

// Components
import Home from './Home';
import Settings from './Settings';

const Navigator = createStackNavigator(
	{
		Home: {screen: Home},
		Settings: {screen: Settings},
	},
	{
		headerMode: 'none',
		initialRouteName: 'Settings',
		defaultNavigationOptions: {
			...TransitionPresets.SlideFromRightIOS,
		},
	},
);

const App = createAppContainer(Navigator);

export default App;

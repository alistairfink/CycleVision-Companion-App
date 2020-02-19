import {StyleSheet} from 'react-native';
import Colours from './Colours';

const NavigationFlowStyles = StyleSheet.create({
  Outer: {
    height: '100%',
    width: '100%',
    backgroundColor: Colours.Primary,
  },
  NavigationOuter: {
    height: '100%',
    padding: 20,
  },
  Navigation: {
    backgroundColor: 'gainsboro',
    flex: 1,
  },
  Header: {},
  Content: {},
  Footer: {},
});

export default NavigationFlowStyles;

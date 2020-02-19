import {StyleSheet} from 'react-native';
import Colours from './Colours';

const NavigationFlowStyles = StyleSheet.create({
  Outer: {
    height: '100%',
    width: '100%',
    backgroundColor: Colours.Primary,
  },
  Header: {
    height: '12%',
    flexDirection: 'row',
  },
  BackOuter: {
    flex: 1,
    justifyContent: 'center',
  },
  Content: {
    height: '78%',
    marginLeft: 10,
    marginRight: 10,
  },
  NavigationOuter: {
    height: '100%',
  },
  Navigation: {
    backgroundColor: 'gainsboro',
    flex: 1,
  },
  Footer: {
    height: '10%',
    flexDirection: 'row',
  },
  FooterLeft: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  FooterRight: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  EndRideOuter: {
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 10,
  },
  EndRideText: {
    fontSize: 15,
    color: Colours.Secondary,
  },
});

export default NavigationFlowStyles;

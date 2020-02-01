import {StyleSheet} from 'react-native';
import Colours from './Colours';

const HomeStyles = StyleSheet.create({
  Outer: {
    height: '100%',
    width: '100%',
    backgroundColor: Colours.Primary,
  },
  TitleBar: {
    height: '20%',
    flexDirection: 'row',
  },
  TitleOuter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Title: {
    color: Colours.Secondary,
    fontSize: 50,
    marginLeft: 50,
  },
  SettingsButton: {
    width: 10,
    width: 50,
  },
  HomeMainOuter: {
    height: '80%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  HomeStartOuter: {
    alignItems: 'center',
  },
  StartRideTitle: {
    fontSize: 35,
    color: Colours.Secondary,
  },
  StartRideButton: {
    width: 250,
    height: 250,
    marginBottom: 50,
    marginTop: 20,
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
});

export default HomeStyles;

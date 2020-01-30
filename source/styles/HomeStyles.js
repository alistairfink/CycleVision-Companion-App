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
  SettingsButtonOuter: {
    justifyContent: 'center',
  },
  SettingsButton: {
    width: 10,
    width: 50,
  },
  SettingsButtonImage: {
    width: 50,
  },
  HomeMainOuter: {
    height: '80%',
    justifyContent: 'flex-end',
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
  SettingsMenu: {
    backgroundColor: Colours.Secondary,
    borderWidth: 1,
    borderColor: Colours.Primary,
    padding: 10,
    position: 'absolute',
    left: 0,
    zIndex: 999,
  },
  SettingsOption: {},
});

export default HomeStyles;

import {StyleSheet} from 'react-native';
import Colours from './Colours';

const HomeStyles = StyleSheet.create({
  Outer: {
    height: '100%',
    width: '100%',
    backgroundColor: Colours.Main,
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
    color: 'white',
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
});

export default HomeStyles;

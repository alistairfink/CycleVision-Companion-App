import {StyleSheet} from 'react-native';
import Colours from './Colours';

const SettingsStyles = StyleSheet.create({
  Outer: {
    backgroundColor: Colours.Primary,
    height: '100%',
  },
  TitleBar: {
    height: '20%',
    flexDirection: 'row',
  },
  TitleOuter: {
    flex: 1,
    justifyContent: 'center',
  },
  Title: {
    color: Colours.Secondary,
    fontSize: 50,
  },
  SettingsItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 15,
  },
  SettingsItemImage: {
    width: 40,
    height: 40,
    marginLeft: 15,
    marginRight: 20,
  },
  SettingsItemTitleOuter: {},
  SettingsItemTitle: {
    color: Colours.Secondary,
    fontSize: 30,
  },
  SettingsItemSubTitle: {
    color: Colours.Secondary,
    fontSize: 15,
  },
});

export default SettingsStyles;

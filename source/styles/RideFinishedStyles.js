import {StyleSheet} from 'react-native';
import Colours from './Colours';

const RideFinishedStyles = StyleSheet.create({
  Outer: {
    height: '100%',
    width: '100%',
    backgroundColor: Colours.Primary,
  },
  Header: {
    height: '20%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  TitleOuter: {
    justifyContent: 'center',
    flex: 1,
  },
  Title: {
    color: Colours.Secondary,
    fontSize: 35,
    marginLeft: 45,
    marginTop: -10,
  },
  ExitImg: {
    height: 30,
    width: 30,
    marginRight: 20,
  },
  Content: {
    height: '80%',
    alignItems: 'center',
  },
  MainContent: {
    flex: 1,
    width: '100%',
    paddingLeft: 45,
  },
  ContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  ContentRowImage: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  ContentText: {},
  ContentRowTitle: {
    color: Colours.Secondary,
    fontSize: 25,
  },
  ContentRowTitleSubText: {
    color: Colours.Secondary,
    fontSize: 15,
  },
});

export default RideFinishedStyles;

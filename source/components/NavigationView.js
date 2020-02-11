import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {requireNativeComponent, StyleSheet, View} from 'react-native';

type Props = {
  origin: {
    lat: number,
    long: number,
  },
  destination: {
    lat: number,
    long: number,
  },
  style?: Object,
};

const MapboxNavigationView = requireNativeComponent(
  'MapboxNavigationView',
  NavigationView,
);

function NavigationView() {
  const props = {
    origin: {
      lat: 38.8951,
      long: -77.0364,
    },
    destination: {
      lat: 38.883955,
      long: -77.033189,
    },
    style: StyleSheet.create({
      navigation: {
        height: '100%',
        backgroundColor: 'gainsboro',
      },
    }),
  };

  return (
    <View
      style={{
        height: '100%',
        borderColor: 'blue',
        borderWidth: 5,
      }}>
      <MapboxNavigationView style={props.style.navigation} {...props} />
    </View>
  );
}

export default NavigationView;

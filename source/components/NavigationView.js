import React, {Component,} from 'react';
import PropTypes from 'prop-types';
import {requireNativeComponent, StyleSheet, View, UIManager, findNodeHandle} from 'react-native';

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

export default class NavigationView extends Component<any, Props, any> {
  stopNavigation() {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.navRef),
      1,
      [], 
    );
  }

  render() {
    debugger;
    return <MapboxNavigationView ref={(ref) => this.navRef = ref} style={this.props.style} {...this.props} />;
  }
}

NavigationView.propTypes = {
  origin: PropTypes.shape({
    lat: PropTypes.number,
    long: PropTypes.number,
  }).isRequired,
  destination: PropTypes.shape({
    lat: PropTypes.number,
    long: PropTypes.number,
  }).isRequired,
};

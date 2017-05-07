/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Paralax from './app/paralax/paralax'
import HeartView from './app/heart/heart-view'

export default class animations extends Component {
  render() {
    return (
      <HeartView />
    );
  }
}

AppRegistry.registerComponent('animations', () => animations);

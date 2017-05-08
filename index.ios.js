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
import Paralax from './app/paralax/paralax';
import HeartView from './app/heart/heart-view';
import ActionButtom from './app/action-buttom/action-buttom';
import Swipe from './app/swipe';
import HeartReaction from './app/heart-reaction';
import Notify from './app/notify-input';

export default class animations extends Component {
  render() {
    return (
      <Notify />
    );
  }
}

AppRegistry.registerComponent('animations', () => animations);

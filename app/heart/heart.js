/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated
} from 'react-native';

export const Heart = ({filled, style, ... props}) => {
  const centerNonFilled = (
    <View style={[StyleSheet.absoluteFill, styles.fit]}>
      <View style={[styles.leftHeart, styles.heartShape, styles.empty]}/>
      <View style={[styles.rightHeart, styles.heartShape, styles.empty]}/>
    </View>
  );
  const fillStyle = filled ? styles.filledHeart : styles.empty;
  return (
    <Animated.View style={[styles.heart, style]}>
      <View style={[styles.leftHeart, styles.heartShape, fillStyle]}/>
      <View style={[styles.rightHeart, styles.heartShape, fillStyle]}/>
      {!filled && centerNonFilled}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  heart: {
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
  },
  heartShape: {
    width: 30,
    height: 45,
    position: 'absolute',
    top: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  filledHeart: {
    backgroundColor: '#e31745',
  },
  fit: {
    transform: [
      {scale: .9}
    ]
  },
  emptyFill: {
    backgroundColor: '#fff'
  },
  empty: {
    backgroundColor: '#ccc'
  },
  leftHeart: {
    transform: [
      {rotate: '-45deg'}
    ],
    left: 5
  },
  rightHeart: {
    transform: [
      {rotate: '45deg'}
    ],
    right: 5
  }
})

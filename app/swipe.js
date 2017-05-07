/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  Animated,
  TextInput,
  ScrollView
} from 'react-native';

export default class Swipe extends Component {
  componentWillMount() {
    this.animated = new Animated.Value(0);
    this.animatedMargin = new Animated.Value(0);
    this.scrollOffset=0;
    this.contentHeight=0;
    this.scrollViewHeight = 0;

    this.panResponder = PanResponder.create({
          onMoveShouldSetPanResponder: (evt,gestureState) => {
            const {dy}=gestureState;
            const totalScrollHeight = this.scrollOffset + this.scrollViewHeight;

            if(
              (this.scrollOffset <= 0 && dy >0) ||
              ((totalScrollHeight>= this.contentHeight) && dy>0)
            ){
              return true;
            }
          },
          onPanResponderMove: (e, gestureState) => {
            const { dy } = gestureState;
            if(dy < 0){
              this.animated.setValue(dy);
            }else if(dy >0){
              this.animatedMargin.setValue(dy);
            }
          },
          onPanResponderRelease: (e, gestureState) => {
            const {dy} = gestureState;

            if(dy < -150){
              Animated.parallel([
                Animated.timing(this.animated, {
                  toValue: -400,
                  duration: 150
                }),
                Animated.timing(this.animatedMargin, {
                  toValue: 0,
                  duration: 150
                })
              ]).start()
            }else if(dy > -150 && dy < 150){
              Animated.parallel([
                Animated.timing(this.animated, {
                  toValue: 0,
                  duration: 150
                }),
                Animated.timing(this.animatedMargin, {
                  toValue: 0,
                  duration: 150
                })
              ]).start()
            }else if(dy > 150){
              Animated.timing(this.animated, {
                toValue: 400,
                duration: 300
              }).start()
            }
          }
        })
  }
  render() {
    const spacerStyle = {
      marginTop: this.animatedMargin
    }

    const opacityInterpolate = this.animated.interpolate({
      inputRange: [-400, 0, 400],
      outputRange: [0, 1, 0]
    })

    const modalStyle = {
      transform: [
        {translateY: this.animated}
      ],
      opacity: opacityInterpolate
    }

    return (
      <View style={styles.container}>
        <Animated.View style={spacerStyle} />
        <Animated.View
          style={[styles.modal, modalStyle]}
          {... this.panResponder.panHandlers}
        >
          <View style={styles.comments}>
            <ScrollView
              scrollEventThrottle={16}
              onScroll={event => {
                this.scrollOffset = event.nativeEvent.contentOffset.y;
                this.scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
              }}
              onContentSizeChange={(contentWidth,contentHeight) => {
                this.contentHeight = contentHeight;
              }}
            >
              <Text style={styles.fakeText}>Bottom</Text>
              <View style={styles.fakeComments}/>
              <Text style={styles.fakeText}>Top</Text>
            </ScrollView>
          </View>
          <View style={this.inputWrap}>
            <TextInput style={styles.textInput} placeholder="Type Here"/>
          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

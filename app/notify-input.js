/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput
} from 'react-native';

export default class Notify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animate: new Animated.Value(0),
      success: false,
    };
    this.handlePress = this.handlePress.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }

  componentWillMount() {

  }


  handleSend(){
    this.setState({
      success: true
    }, ()=>{
      Animated.sequence([
        Animated.timing(this.state.animate, {
          toValue: 0,
          duration: 300
        }),
        Animated.delay(1500)
      ]).start(()=> this.setState({success:false}));
    })
  }

  handlePress(){
    Animated.timing(this.state.animate, {
      toValue: 1,
      duration: 300
    }).start();
  }
  render() {
    const widthInterpolate = this.state.animate.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [150, 150, 300],
      extrapolate: 'clamp'
    })
    const inputScaleInterpolate = this.state.animate.interpolate({
      inputRange: [0,0.5, 0.6],
      outputRange: [0,0,1],
      extrapolate: 'clamp'
    })
    const sendButtonInterpolate = this.state.animate.interpolate({
      inputRange: [0, .6,1],
      outputRange: [0,0,1]
    })

    const thankYouScaleInterpolate = this.state.animate.interpolate({
      inputRange: [0,1],
      outputRange: [1,0]
    })

    const thankYouTextStyle = {
      transform: [
        {scale: thankYouScaleInterpolate}
      ]
    }

    const notifyTextScaleInterpolate = this.state.animate.interpolate({
      inputRange: [0,.5],
      outputRange: [1,0],
      extrapolate: 'clamp'
    })

    const notifyTextStyle = {
      transform: [
        {scale: notifyTextScaleInterpolate}
      ]
    }

    const sendButtonStyle = {
      transform: [
        {scale: sendButtonInterpolate}
      ]
    }
    const inputScaleStyle = {
      transform: [
        {scale: inputScaleInterpolate}
      ]
    }
    const buttonWrapStyle = {
      width: widthInterpolate
    }
    const {success} = this.state;
    return (
      <View style={styles.container}>
          <TouchableWithoutFeedback onPress={this.handlePress}>
            <Animated.View style={[styles.buttonWrap, buttonWrapStyle]}>
              {!success && <Animated.View style={[StyleSheet.absoluteFill, styles.inputWrap ,inputScaleStyle]}>
              <TextInput
                autofocus
                keyboardType="email-address"
                placeholder="Email"
                style={styles.textInput}
              />
              <TouchableOpacity style={[styles.sendButton, sendButtonStyle]}>
                <Text style={styles.sendText}>Send</Text>
              </TouchableOpacity>
            </Animated.View>
            }

            {!success && <Animated.View style={notifyTextStyle}>
              <Text style={styles.notifyText}>Notify Me</Text>
            </Animated.View>
            }
            {success && <Animated.View style={thankYouTextStyle}>
              <Text style={styles.notifyText}>Thank You!</Text>
            </Animated.View>
            }
            </Animated.View>
          </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:"center",
    alignItems: "center"
  },
});

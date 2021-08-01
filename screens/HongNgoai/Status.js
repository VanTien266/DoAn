import React, { useEffect, useState } from "react";
import { Component } from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity, Button } from "react-native";
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { db } from "../../Components/FirebaseConfig";
import notificationManager from "./Alarm";
export default class Status extends Component {
  constructor(props) {
    super(props)
    this.localNotify
  }

  componentDidMount() {
    this.localNotify = notificationManager
    this.localNotify.configure()
  }
  onPressNotification =( )=> {
       this.localNotify.showNotification(
         1, 
         "App Notification",
       )
  };
  render() {
    return(
      <View style={styles.container}>
        <Button
          onPress = {method}
          title="Learn More"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>);
    }
  }
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    // position:'absolute'
    // alignSelf:'center'
  },
  poly: {
    alignItems: "center",
    margin: 10,
  },
});

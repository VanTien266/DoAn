import React, { Component } from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity, Button } from "react-native";
import Sound from 'react-native-sound';




export default function Status() {
    const sound = new Sound(require('../../assets/alarm.mp3'),(error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      else {console.log('loaded the sound');}
    })
    const playsound= ()=>{
      sound.play()
    }
    return (
      <View style={styles.container}>
          <Button style = {styles.poly}
          onPress = {playsound}
          title="Start"
          color= "green"
          /> 
          <Button style = {styles.poly}
          onPress = {() => {sound.stop()}}
          title="Stop"
          color= "green"
          /> 
      </View>
    );
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
    margin: 12,
  },
});

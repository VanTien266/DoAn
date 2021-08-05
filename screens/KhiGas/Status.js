import React, { useEffect, useState } from "react";
import { Card } from "react-native-elements"
import { Text, View, Image, StyleSheet, ToastAndroid, TouchableOpacity, Button, Vibration } from "react-native";
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import database from '@react-native-firebase/database';
import Sound from 'react-native-sound';

const sound = new Sound(require('../../assets/alarm.mp3'),(error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  else {  
    sound.setNumberOfLoops(-1);
  }
})

export default function Status({navigation}) {
  const DURATION =[1000,1000]
  const REAPEAT = true
  const unactive = require("../../assets/icon/lock_red.png")
  const active = require("../../assets/icon/shield.png")
  const warning = require("../../assets/icon/warning.png")
  const both = { unactive, active }
  const [image, setImage] = useState(unactive)
  const [sensorStatus, setStatus] = useState(true)
  const [isActive, setIsActive] = useState(false)

  const startVibration = () => {
    navigation.navigate('Status')
    sound.play()
    Vibration.vibrate(DURATION, REAPEAT)
  }
  const stopVibration = () => {
    sound.stop()
    Vibration.cancel()
  }

  const showToastWithGravity = (status) => {
    ToastAndroid.showWithGravity(
      "RELAY SWITCH TO " + status,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOMq
    );
  };

  const getData = () => {
    database().ref("/request/relay")
      .on('value', snapshot => {
        //setUser({name:snapshot.val().name, email: snapshot.val().email})
        //console.log(snapshot.val() )
        if (snapshot.val().value == "ON") setIsActive(true);
        else setIsActive(false);
        //setLoading(true);
      });
      database().ref("/request/gas_sensor").on('value', snapshot => {
      setStatus(Boolean(Number(snapshot.val().status)));
    })
  }

  const statusChange = () => {
    if (isActive) {
      if (sensorStatus) {setImage(warning)}
      else {setImage(active)}
    }
    else {
      setImage(unactive)
    }
    if (sensorStatus == false || isActive == false) {
      stopVibration()
    }
    if (sensorStatus == true && isActive == true) {
      startVibration()
    }
  }
  const swipeUp = () => {
    setIsActive(true)
    setImage(active)
    //setIsActive(true)
    database().ref("/request/relay").update({
      status: 1,
      value: "ON"
    }).then((snapshot) => {
      //showToastWithGravity("ON")
    })
  }

  const swipeDown = () => {
    setIsActive(false)
    setImage(unactive)
    //setIsActive(false)
    database().ref("/request/relay").update({
      status: 1,
      value: "OFF"
    }).then(
      //showToastWithGravity("OFF")
    )
  }

  useEffect(() => {
    getData()
  });
  useEffect(statusChange, [sensorStatus, isActive])
  return (
    <View style={styles.container}>
    <GestureRecognizer
      style = {styles.poly}
      onSwipeUp={swipeUp}
      onSwipeDown={swipeDown}
    >
      <View style={styles.poly}>
        {isActive ? null : <Text>Kích hoạt</Text>}
        {isActive ? null : <Image source={require("../../assets/icon/poly_green.png")} />}
      </View>
        <Image source={image} style={{ width: 200, height: 200, resizeMode: "contain" }} />

        <View style={styles.poly}>
        {isActive ? <Image source={require("../../assets/icon/poly_red.png")} /> : null}
        {isActive ? <Text>Tắt</Text> : null}
        </View>
      {isActive ?
          sensorStatus ? 
              <Card containerStyle={styles.redCard}>
                <Text 
                  style={styles.titleText}>
                    Hệ thống đang bật
                  </Text>
                <Text 
                  style={styles.gasSensorStatus}>
                    Nồng độ khí gas trong không khí vượt mức cho phép
                  </Text>
                  <View style={styles.poly}>
          <Button 
          onPress = {stopVibration}
          title="TẮT CẢNH BÁO"
          color= "red"
          /> 
        </View>
                </Card> : 
              <Card containerStyle={styles.greenCard}>
                <Text 
                  style={styles.titleText}>
                    Hệ thống đang bật 
                  </Text>
                <Text 
                  style={styles.gasSensorStatus}>
                    Nồng độ khí gas trong không khí ở mức bình thường
                  </Text>
                </Card>
            
        : <Card containerStyle={styles.greyCard}>
              <Text
                style={styles.offText}>
                Hệ thống đã được tắt {"\n"}Vuốt lên để bật lại.
              </Text>
          </Card>
      }
    </GestureRecognizer >
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
  greyCard: {
    backgroundColor: "#696969",
    height:138,
    width:330,
    justifyContent:"center",
  },
  poly: {
    alignItems: "center",
    margin: 10,
  },
  offText: {
    fontSize: 20,
    color:"white",
    textAlign: "center",
  },
  gasSensorStatus: {
    fontSize: 20,
    textAlign:"center",
    color:"white",
  },
  titleText: {
    fontSize: 22,
    fontWeight:"bold",
    textAlign:"center",
    color:"white",
  },
  redCard: {
    backgroundColor: "#BD1D1D",
  },
  greenCard: {
    backgroundColor: "#00DC7F",
  },
});

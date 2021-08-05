import React, { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity, Vibration, Button } from "react-native";
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { db } from "../../Components/FirebaseConfig";
import Sound from 'react-native-sound';
import { Card } from "react-native-elements"

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
  const unactive = require("../../assets/icon/unlock.png")
  const active = require("../../assets/icon/lock_green.png")
  const warning = require("../../assets/icon/warning.png")
  const both = { unactive, active }
  const [image, setImage] = useState(unactive)
  const [isActive, setIsActive] = useState(false)
  const [status, setStatus] = useState(false)

  const startVibration = () => {
    navigation.navigate('Status')
    sound.play()
    Vibration.vibrate(DURATION, REAPEAT)
  }
  const stopVibration = () => {
    sound.stop()
    Vibration.cancel()
  }

  const getData = () => {
    db.ref("/request/relay")
      .on('value', snapshot => {
        //setUser({name:snapshot.val().name, email: snapshot.val().email})
        //console.log(snapshot.val() )
        if (snapshot.val().value == "ON") setIsActive(true);
        else setIsActive(false);
        //setLoading(true);
      });
    db.ref("/request/magnetic").on('value', snapshot => {
      setStatus(Boolean(Number(snapshot.val().status)));
    })
  }
  const batCongTac = () => {
    setImage(active)
    setIsActive(true)
    db.ref("/request/relay").update({
      status: 1,
      value: "ON"
    }).then((snapshot) => {
      console.log('MAGNETIC BUTTON SWITCH ON')
    })
  }
  const statusChange = () => {
    if (isActive) {
      if (status) {setImage(warning)}
      else {setImage(active)}
    }
    else {
      setImage(unactive)
    }
    if (status == false || isActive == false) {
      stopVibration()
    }
    if (status == true && isActive == true) {
      startVibration()
    }
  }
  const tatCongtac = () => {
    setImage(unactive)
    setIsActive(false)
    db.ref("/request/relay").update({
      status: 1,
      value: "OFF"
    }).then(
      console.log("MAGNETIC DETECT BUTTON SWITCH OFF")
    )
  }
  const baoDong = () => {
    if (isActive) {
        if (status) {
            navigation.navigate('Status')
        }
    }
}
  useEffect(() => {
    getData()
  });
  useEffect(statusChange, [status, isActive])
  return (
      <View style={[styles.container]}>

        {isActive ? null : <TouchableOpacity
          style={styles.poly}
          onPress={batCongTac}
        >
          <Text
            style={{
              marginBottom: 10,
            }}
          >
            Kích hoạt hệ thống
          </Text>
          <Image source={require("../../assets/icon/poly_green.png")} />
        </TouchableOpacity>}

        <Image source={image} style={{ width: 200, height: 200, resizeMode: "contain" }} />

        {isActive ? <TouchableOpacity
          style={styles.poly}
          onPress={tatCongtac}
        >
          <Image source={require("../../assets/icon/poly_red.png")} />
          <Text
            style={{
              marginTop: 10,
            }}
          >
            Tắt hệ thống
          </Text>
        </TouchableOpacity> : null}

        {isActive ? status ? <Card containerStyle={styles.redCard}>
                <Text 
                  style={styles.titleText}>
                    Hệ thống đang bật
                  </Text>
                <Text 
                  style={styles.SensorStatus}>
                    Phát hiện có người đột nhập
                  </Text>
                  <View style={styles.poly}>
          <Button 
          onPress = {stopVibration}
          title="TẮT CẢNH BÁO"
          color= "red"
          /> 
        </View>
                </Card> : <Card containerStyle={styles.greenCard}>
                <Text 
                  style={styles.titleText}>
                    Hệ thống đang bật
                  </Text>
                </Card> : <Card containerStyle={styles.greyCard}>
              <Text
                style={styles.offText}>
                Hệ thống đã được tắt {"\n"}Nhấn nút để bật lại.
              </Text>
          </Card>} 
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
    margin: 10,
  },
  redCard: {
    backgroundColor: "#BD1D1D",
  },
  greenCard: {
    backgroundColor: "#00DC7F",
  },
  greyCard: {
    backgroundColor: "#696969",
    height:138,
    width:330,
    justifyContent:"center",
  },
  SensorStatus: {
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
  offText: {
    fontSize: 20,
    color:"white",
    textAlign: "center",
  },
});

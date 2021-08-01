import React, { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity, Vibration, Button } from "react-native";
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { db } from "../../Components/FirebaseConfig";
export default function Status() {
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
    Vibration.vibrate(DURATION, REAPEAT)
  }
  const stopVibration = () => {
    Vibration.cancel()
  }

  const getData = () => {
    db.ref("/request/magnetic")
      .on('value', snapshot => {
        //setUser({name:snapshot.val().name, email: snapshot.val().email})
        //console.log(snapshot.val() )
        if (snapshot.val().value == "ON") setIsActive(true);
        else setIsActive(false)
        if (isActive) {
          setStatus(Boolean(snapshot.val().status));
          if (status) {setImage(warning)}
          else {setImage(active)}
        }
        else {
          setImage(unactive)
        }
        //setLoading(true);
      });
  }
  const batCongTac = () => {
    setImage(active)
    setIsActive(true)
    db.ref("/request/magnetic").update({
      value: "ON"
    }).then((snapshot) => {
      console.log('MAGNETIC BUTTON SWITCH ON')
    })
  }

  const tatCongtac = () => {
    setImage(unactive)
    setIsActive(false)
    db.ref("/request/magnetic").update({
      value: "OFF"
    }).then(
      console.log("MAGNETIC DETECT BUTTON SWITCH OFF")
    )
  }
  
  const tatBaodong = () => {
    setImage(active)
    stopVibration()
    setStatus(false)
    db.ref("/request/magnetic").update({
      status: 0
    }).then((snapshot) => {
      console.log('MAGNETIC TURN OFF WARNING')
    })
  }
  
  useEffect(() => {
    getData()
  });
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
            Kích hoạt
          </Text>
          <Image source={require("../../assets/icon/poly_green.png")} />
        </TouchableOpacity>}

        <Image source={image} style={{ width: 200, height: 200, resizeMode: "contain" }} />

        {isActive ? status ? startVibration() : null : null}
        {isActive ? status ? <View style={styles.poly}>
          <Button
          onPress = {tatBaodong}
          title="TẮT BÁO ĐỘNG"
          color= "green"
          /> 
        </View>: <TouchableOpacity
          style={styles.poly}
          onPress={tatCongtac}
        >
          <Text
            style={{
              marginBottom: 10,
            }}
          >
            Tắt
          </Text>
          <Image source={require("../../assets/icon/poly_red.png")} />
        </TouchableOpacity> : null} 
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
});

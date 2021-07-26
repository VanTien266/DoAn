import React, { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { db } from "../../Components/FirebaseConfig";

export default function Status() {
  const unactive = require("../../assets/icon/lock_red.png")
  const active = require("../../assets/icon/shield.png")
  const both = { unactive, active }
  const [image, setImage] = useState(unactive)
  const [isActive, setIsActive] = useState(false)

  const getData = () => {
    db.ref("/request/gas_sensor")
      .once('value', snapshot => {
        //setUser({name:snapshot.val().name, email: snapshot.val().email})
        //console.log(snapshot.val() )
        setIsActive(Boolean(snapshot.val().status));
        if (isActive) {
          setImage(active)
        }
        else {
          setImage(unactive)
        }
        //setLoading(true);
      });
  }
  const swipeUp = () => {
    setImage(active)
    setIsActive(true)
    db.ref("/request/gas_sensor").set({
      status: 1,
      value: "ON"
    }).then((snapshot) => {
      console.log('GAS DETECT BUTTON SWITCH ON')
    })
  }

  const swipeDown = () => {
    setImage(unactive)
    setIsActive(false)
    db.ref("/request/gas_sensor").set({
      status: 0,
      value: "OFF"
    }).then(
      console.log("GAS DETECT BUTTON SWITCH OFF")
    )
  }
  
  useEffect(() => {
    getData()
  }, [isActive]);
  return (
    <GestureRecognizer
      style={{ flex: 1 }}
      onSwipeUp={swipeUp}
      onSwipeDown={swipeDown}
    >
      <View style={[styles.container]}>
        {isActive ? null : <Text>Kích hoạt</Text>}
        {isActive ? <Image style={styles.poly} /> : <Image style={styles.poly} source={require("../../assets/icon/poly_green.png")} />}

        <Image source={image} style={{ width: 200, height: 200, resizeMode: "contain" }} />


        {isActive ? <Image style={styles.poly} source={require("../../assets/icon/poly_red.png")} /> : null}
        {isActive ? <Text>Tắt</Text> : null}

      </View>
    </GestureRecognizer >
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

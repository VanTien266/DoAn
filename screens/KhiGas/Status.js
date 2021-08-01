import React, { useEffect, useState } from "react";
import { Card } from "react-native-elements"
import { Text, View, Image, StyleSheet, ToastAndroid, TouchableOpacity } from "react-native";
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import database from '@react-native-firebase/database';

export default function Status() {
  const unactive = require("../../assets/icon/lock_red.png")
  const active = require("../../assets/icon/shield.png")
  const both = { unactive, active }
  const [image, setImage] = useState(unactive)
  const [sensorStatus, setSensorStatus] = useState(true)
  const [isActive, setIsActive] = useState(false)

  const showToastWithGravity = (status) => {
    ToastAndroid.showWithGravity(
      "RELAY SWITCH TO " + status,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOMq
    );
  };

  const getRelayData = () => {
    database().ref("/request/relay")
      .on('value', snapshot => {
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
  const getSensorData = () => {
    database().ref("/request/gas_sensor")
      .on('value', snapshot => {
        setSensorStatus(Boolean(snapshot.val().status));
      });
  }
  const swipeUp = () => {
    setImage(active)
    //setIsActive(true)
    database().ref("/request/relay").set({
      status: 1,
      value: "ON"
    }).then((snapshot) => {
      //showToastWithGravity("ON")
    })
  }

  const swipeDown = () => {
    setImage(unactive)
    //setIsActive(false)
    database().ref("/request/relay").set({
      status: 0,
      value: "OFF"
    }).then(
      //showToastWithGravity("OFF")
    )
  }

  useEffect(() => {
    getRelayData()
    getSensorData()
  }, [isActive, sensorStatus]);
  return (
    <GestureRecognizer
      style={{ flex: 1 }}
      onSwipeUp={swipeUp}
      onSwipeDown={swipeDown}
    >
      <View style={[styles.container]}>
        {isActive ? null : <Text>Kích hoạt</Text>}
        {isActive ? null : <Image style={styles.poly} source={require("../../assets/icon/poly_green.png")} />}

        <Image source={image} style={{ width: 200, height: 200, resizeMode: "contain" }} />


        {isActive ? <Image style={styles.poly} source={require("../../assets/icon/poly_red.png")} /> : null}
        {isActive ? <Text>Tắt</Text> : null}
      </View>
      {isActive ?
        <View style={styles.card}>
          {sensorStatus ? 
              <Card containerStyle={styles.redCard}>
                <Text 
                  style={styles.titleText}>
                    Hệ thống đang bật {"\n"}
                  </Text>
                <Text 
                  style={styles.gasSensorStatus}>
                    Nồng độ khí gas trong không khí vượt mức cho phép
                  </Text>
                  
                </Card> : 
              <Card containerStyle={styles.greenCard}>
                <Text 
                  style={styles.titleText}>
                    Hệ thống đang bật {"\n"}
                  </Text>
                <Text 
                  style={styles.gasSensorStatus}>
                    Nồng độ khí gas trong không khí ở mức bình thường
                  </Text>
                </Card>
            }
        </View>
        : <View style={styles.card}>
            <Card containerStyle={styles.greyCard}>
              <Text
                style={styles.offText}>
                Hệ thống đã được tắt {"\n"}Vuốt lên để bật lại.
              </Text>
              
              <Text
                style={styles.offText}>
                
              </Text>
              

          </Card>
        </View>
      }



    </GestureRecognizer >
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 2,
    justifyContent: "flex-end",
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
  card: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-start",
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

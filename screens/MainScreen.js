import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { db } from "../Components/FirebaseConfig";

const Main = (props) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  const [magneticStatus, setMagneticStatus] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [gasStatus, setGasStatus] = useState(false)
  const getsensorData = () => {
    db.ref("/request/relay")
      .on('value', snapshot => {
        //setUser({name:snapshot.val().name, email: snapshot.val().email})
        //console.log(snapshot.val() )
        if (snapshot.val().value == "ON") setIsActive(true);
        else setIsActive(false);
        //setLoading(true);
      });
    db.ref("/request/magnetic").on('value', snapshot => {
      setMagneticStatus(Boolean(Number(snapshot.val().status)));
    })
    db.ref("/request/gas_sensor").on('value', snapshot => {
      setGasStatus(Boolean(Number(snapshot.val().status)));
    })
  }
  const baoDong = () => {
    if (isActive) {
      if (magneticStatus) {props.navigation.navigate("CongTac")}
      else if (gasStatus) {props.navigation.navigate("KhiGas")}
    }
  } 
  const currentUser = auth().currentUser;

  const getData = () =>{
    database().ref("/user")
    .on('value', snapshot => {
      //setUser({name:snapshot.val().name, email: snapshot.val().email})
     // console.log(snapshot.val() )
     
      if(auth().currentUser) {
          snapshot.forEach(elem => {
            //console.log(elem.val().email + " " + currentUser.email)
            if (elem.val().email == currentUser.email){
            
            //console.log(elem)
            setUser({
              name: elem.val().name,
              email: elem.val().email,
            })
          }
        })
      }
      //setLoading(true);
    });
  }
  useEffect( () =>  {
      getData()
      //console.log(auth().currentUser.email)
  }, [user.email,user.name]);
  useEffect(()=> {getsensorData()})
  useEffect(()=> {baoDong()}, [isActive, magneticStatus, gasStatus])
  return (
    <View styles={styles.container}>
      <ImageBackground
        source={require("../assets/background.png")}
        style={styles.infomation}
      >
        <View style={styles.avatar}>
          <ImageBackground
            style={styles.avatarImage}
            resizeMode="contain"
            source={require("../assets/default_avatar.png")}
          ></ImageBackground>
        </View>
        <View style={styles.userInfo}>
          <Text style={{ color: "#fff", fontSize: 22, fontWeight: "bold" }}>
            {user.name}
          </Text>
          <Text style={{ color: "#fff", fontSize: 18 }}>{user.email}</Text>
        </View>
      </ImageBackground>
      <View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => props.navigation.navigate("CongTac")}
        >
          <Text style={styles.button}>C???m bi???n c??ng t???c</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => props.navigation.navigate("KhiGas")}
        >
          <Text style={styles.button}>C???m bi???n kh?? gas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={async () => { 
            //await AsyncStorage.clear()
            auth().signOut().then( () => {
            console.log("sign out success")
            props.navigation.navigate("Login")
          }).catch( err => {
            console.log(err)
          })
          }}>
            <Text style={styles.button}>Sign out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  infomation: {
    // width: 411,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 210,
    marginBottom: 80,
  },
  avatar: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 20,
    //paddingBottom: 25,
  },
  avatarImage: {
    height: 125,
    width: 100,
    resizeMode: "contain",
    flexDirection: "row",
  },
  cameraButton: {
    // height: 50,
    // width: 50,
    // resizeMode: "contain",
    // alignSelf: "flex-end",
    // paddingLeft: 160,
    // //flex:1,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  userInfo: {
    justifyContent: "center",
    alignItems: "center",
    //marginBottom: 80,
    flex: 3,
  },
  buttonContainer: {
    width: 350,
    height: 65,
    backgroundColor: "#017A23",
    borderRadius: 75,
    justifyContent: "center",
    marginBottom: 25,
    alignSelf: "center",
  },
  button: {
    color: "#fff",
    alignSelf: "center",
    fontSize: 24,
  },
});
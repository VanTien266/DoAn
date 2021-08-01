import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import Tabs from "../routes/BottomNav";
import database from '@react-native-firebase/database';

const Main = (props) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const getData = () =>{
    database().ref("/user")
    .once('value', snapshot => {
      //setUser({name:snapshot.val().name, email: snapshot.val().email})
     // console.log(snapshot.val() )
      setUser(snapshot.val());
      //setLoading(true);
    });
  }
  useEffect(() =>  {
      getData()
  }, [user]);
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
          <Text style={styles.button}>Cảm biến công tắc</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => props.navigation.navigate("HongNgoai")}
        >
          <Text style={styles.button}>Cảm biến hồng ngoại</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => props.navigation.navigate("KhiGas")}
        >
          <Text style={styles.button}>Cảm biến khí gas</Text>
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

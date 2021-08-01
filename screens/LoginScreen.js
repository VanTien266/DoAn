import React, { useState} from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import auth from '@react-native-firebase/auth';

export default function Login({ navigation }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const loginPressHandler = (username, password) => {
    try{
      if  (username != "" && password != "") {
        auth().signInWithEmailAndPassword(username, password).then(
          console.log("sign in with email: " + username)
        )
      }
      else {
        alert("Username and password cannot be empty")
      }
    } catch(err){alert(err)}
    auth().onAuthStateChanged(user => {
      if(user){
        console.log("login to account: " + username),
        navigation.navigate("Main")
      }
    })
  };  

  const registerPressHandler = () => {
    navigation.navigate("Register");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>
      <TextInput 
        style={styles.input} 
        onChangeText={(value)=>{setUsername(value)}}
        placeholder="Tài khoản" />
      <TextInput 
        secureTextEntry 
        style={styles.input} 
        onChangeText={(value)=>{setPassword(value)}}
        placeholder="Mật khẩu" />
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={()=>loginPressHandler(username, password)}
      >
        <Text style={styles.button}>Đăng nhập</Text>
      </TouchableOpacity>
      <View style={styles.extend}>
        <TouchableOpacity onPress={registerPressHandler}>
          <Text style={styles.extendItem}>Đăng kí</Text>
        </TouchableOpacity>

        <Text style={styles.extendItem}>Quên mật khẩu?</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 26,
  },
  title: {
    marginTop: 175,
    textTransform: "uppercase",
    fontSize: 24,
    lineHeight: 28,
    fontWeight: "bold",
    color: "#017A23",
  },
  input: {
    backgroundColor: "#96CCA5",
    marginVertical: 10,
    width: 325,
    height: 70,
    borderRadius: 15,
    paddingHorizontal: 20,
    fontSize: 18,
  },
  buttonContainer: {
    width: 150,
    height: 40,
    backgroundColor: "#017A23",
    borderRadius: 20,
    paddingVertical: 2,
    marginTop: 20,
  },
  button: {
    color: "#fff",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 24,
  },
  extend: {
    // flexDirection: "row",
    paddingTop: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  extendItem: {
    fontStyle: "italic",
    fontWeight: "200",
    fontSize: 17,
    color: "#053217",
  },
});

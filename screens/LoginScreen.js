import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
// const SCREENSIZE = Dimensions.get("screen");
export default function   Login({ navigation }) {
  const loginPressHandler = () => {
    navigation.navigate("Main");
  };

  const registerPressHandler = () => {
    navigation.navigate("Register");
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>
      <TextInput style={styles.input} placeholder="Tài khoản" />
      <TextInput 
        secureTextEntry
        style={styles.input} 
        placeholder="Mật khẩu" />
      <TouchableOpacity style={styles.buttonContainer} onPress={loginPressHandler}>
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
    paddingTop:10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  extendItem: {
    fontStyle:'italic',
    fontWeight: "200",
    fontSize: 17,
    color: "#053217",
  },
});

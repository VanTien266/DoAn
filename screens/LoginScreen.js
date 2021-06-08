import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

// const navigation=useNavigation();
const Login=( {navigation} )=> {
  const pressHandler = () => {
    navigation.navigate("Main");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>
      <TextInput style={styles.input} placeholder="Tài khoản" />
      <TextInput style={styles.input} placeholder="Mật khẩu" />
      <TouchableOpacity style={styles.buttonContainer} onPress={pressHandler}>
        <Text style={styles.button}>Đăng nhập</Text>
      </TouchableOpacity>
      <View style={styles.extend}>
        <Text style={styles.extendItem}>Đăng kí</Text>
        <Text style={styles.extendItem}>Quên mật khẩu</Text>
      </View>
    </View>
  );
}

export default Login;
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
    margin: 5,
    width: 358,
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
    marginVertical: 25,
  },
  button: {
    color: "#fff",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 24,
  },
  extend: {
    // flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  extendItem: {
    margin: 5,
    fontWeight: "bold",
    color: "#053217",
  },
});

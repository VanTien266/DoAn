import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from "react-native";
import {} from "react-native";
import { color } from "react-native-reanimated";
export default function Login() {
  const pressHandler = () => {
    Alert.alert("Hello World!");
  };
  return (
    <View styles={styles.container}>
      <ImageBackground
        source={require("../assets/background.png")}
        style={styles.image}
      >
        <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>
          Lưu Văn Tiến
        </Text>
      </ImageBackground>
      <View>
        <TouchableOpacity style={styles.buttonContainer} onPress={pressHandler}>
          <Text style={styles.button}>Cảm biến công tắc</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={pressHandler}>
          <Text style={styles.button}>Cảm biến hồng ngoại</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={pressHandler}>
          <Text style={styles.button}>Cảm biến khí gas</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    // width: 411,
    justifyContent: "center",
    alignItems: "center",
    height: 210,
    marginBottom: 80,
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

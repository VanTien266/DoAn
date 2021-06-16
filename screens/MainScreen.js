
import React, {useState} from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from "react-native";

const Main = (props) => {
  const [user, setUser] = useState({
    name: 'Luu Van Tien',
    email: 'tienluu1122@gmail.com',
  })

  return (
      <View styles={styles.container}>
        <ImageBackground
          source={require("../assets/background.png")}
          style={styles.image}
        >
          <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>
            {user.name}
          </Text>
          <Text style={{color: '#fff', fontSize: 20}}>
            {user.email}
          </Text>

        </ImageBackground>
        <View>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={()=>props.navigation.navigate('CongTac')}
          >
            <Text style={styles.button}>Cảm biến công tắc</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={()=>props.navigation.navigate('HongNgoai')}
          >
            <Text style={styles.button}>Cảm biến hồng ngoại</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={()=>props.navigation.navigate('KhiGas')}
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
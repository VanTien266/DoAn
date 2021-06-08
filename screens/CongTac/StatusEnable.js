import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";

const StatusEnable = () => {
  return (
    <View style={styles.container}>
        <Text style={{
          marginBottom:10,
        }}>Đang bảo vệ</Text>
      <Image source={require("../../assets/icon/shield.png")} />
      <View style={styles.poly}>
        <Image source={require("../../assets/icon/poly_red.png")} />
        <Text style={{
          marginTop:10,
        }}>Khóa trái cửa</Text>
      </View>
    </View>
  );
};

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
    margin: 12,
  },
});

export default StatusEnable;

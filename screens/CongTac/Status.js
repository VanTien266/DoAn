import React, { Component } from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";

export default class Status extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.poly}
          onPress={() => this.props.navigation.navigate("StatusEnable")}
        >
          <Text
            style={{
              marginBottom: 10,
            }}
          >
            Kích hoạt
          </Text>
          <Image source={require("../../assets/icon/poly_green.png")} />
        </TouchableOpacity>
        <Image source={require("../../assets/icon/lock_red.png")} />
        <View style={styles.poly}>
          <Image source={require("../../assets/icon/poly_red.png")} />
          <TouchableOpacity
          style={styles.poly}
          onPress={() => this.props.navigation.navigate("StatusDisable")}
        >
          <Text
            style={{
              marginTop: 10,
            }}
          >
            Tắt
          </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
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
    margin: 12,
  },
});

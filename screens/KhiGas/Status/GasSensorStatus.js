import React, { useEffect, useState } from "react";
import { Card } from "react-native-elements"
import { Text, View, StyleSheet } from 'react-native'
import { db } from "../../../Components/FirebaseConfig";

export default function GasSensorStatus({sensorStatus}) {

    return(
        <View style ={styles.container}>
            {sensorStatus ? 
              <Card style={styles.redCard}>
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
    );
}

const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      flex: 1,
      justifyContent: "flex-start",
      // position:'absolute'
      // alignSelf:'center'
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
    cardGrey: {
      backgroundColor: "#BD1D1D",
    },
    greenCard: {
      backgroundColor: "#00DC7F",
    },
    redCard: {
      //color: 
    },
});
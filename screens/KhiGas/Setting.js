import React, { useState, useEffect } from "react";
import { db } from "../../Components/FirebaseConfig";
import { StyleSheet, Switch, View, Text} from "react-native";
import Slider from '@react-native-community/slider';


export default function SpeakerSettingItem() {
    
    const getData = () => {
    db.ref("/request/speaker_gas").on('value', snapshot => {
      setcurVal(snapshot.val().value/10);
    })
    }
    const [curVal, setcurVal] = useState(0)
    const sendRequest = val => {
      db.ref("/request/speaker_gas").update({
        status: 1,
        value: val*10
      }).then((snapshot) => {
      })
    }
    useEffect(()=>{getData()})
    return (

        <View style={styles.container}>
            <View style={styles.firstLine}>
                <Text style={styles.name}>Điều chỉnh loa của hệ thống</Text>
            </View>
            <Slider style={styles.slider}
                maximumValue={100}
                minimumValue={0}
                step = {1}
                value={curVal}
                onValueChange = {value => sendRequest(value)}/>
            <View style={styles.textCon}>
                    <Text style={styles.colorGrey}>0</Text>
                    <Text >
                        {curVal}
                    </Text>
                    <Text style={styles.colorGrey}>100</Text>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
        borderTopWidth: 1,
        borderBottomWidth: 1,
    },
    firstLine: {
        flexDirection: "row",
    },
    name: {
        flex: 1,
        marginStart: 15,
        fontSize: 20,
    },
    switch: {
        flex: 1,
        marginEnd: 25,
        transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
    },
    slider: {
        width: 326,
        height: 50,
        marginTop: 20
    },
    textCon: {
      width: 315,
      flexDirection: 'row',
      justifyContent: 'space-between'
  },
  colorGrey: {
    color: 'grey'
},
})

import React, {useEffect, useState} from "react";
import {FlatList, View, StyleSheet } from "react-native";
import NotificationItem from "./Notification/NotficationItem";
import database from '@react-native-firebase/database';


export default function Notification() {
  const [data, setData] = useState([])
  const [loaded, setLoaded] = useState(false)
  const getFirebaseData =async  ()=>{
    if (data.length == 0){
      await database().ref("/data_gas")
      .once('value',snapshot => {
        var prevalue = 0
        snapshot.forEach(async elem => {
          //console.log("ok")
          //console.log(Number(elem.val().status) != prevalue)
          if (Number(elem.val().status) != prevalue) {
            prevalue = Number(elem.val().status)
            if (Number(elem.val().status) == 1){
              setData(arr=>[...arr, {
                key:elem.key,
                noti:"Nồng độ khí gas trong không khí vượt ngưỡng",
                status: elem.val().status,
                time: elem.val().time,
                type: "gas_sensor"
              }])
            }
            else {
              setData(arr=>[...arr, {
                key:elem.key,
                noti:"Nồng độ khí gas trong không khí trờ về bình thường",
                status: elem.val().status,
                time: elem.val().time,
                type: "gas_sensor"
              }])
            }
            
          }
        })  
      });
    await database().ref("/data_relay")
      .once('value', snapshot => {
        var prevalue = 0
        snapshot.forEach(async elem => {
          //console.log("ok")
          //console.log(Number(elem.val().status) != prevalue)
          if (Number(elem.val().status) != prevalue) {
            prevalue = Number(elem.val().status)
            if (Number(elem.val().status) == 1){
              setData(arr=>[...arr, {
                key:elem.key,
                noti:"Hệ thống bảo vệ nhà thông minh được bật trở lại",
                status: elem.val().status,
                time: elem.val().time,
                type: "relay"
              }])
            }
            else {
              setData(arr=>[...arr, {
                key:elem.key,
                noti:"Hệ thống bảo vệ nhà thông minh đã tắt",
                status: elem.val().status,
                time: elem.val().time,
                type: "relay"
              }])
            }
            
          }
        })  
      });
    
      console.log("hello")
    }
      setLoaded(true)
      console.log("finished")
      console.log(data)
  }
  useEffect(()=>{
    console.log("start")
    getFirebaseData()
    
  },[loaded])
  data.sort((a,b)=>{return new Date(b.time) - new Date(a.time);})
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item=>item.key}
        renderItem={({item})=>(
          <NotificationItem 
            noti={item.noti}
            date={item.time.substring(0,10)}
            time={item.time.substring(11,19)} />
        )} />

      
        {/* <NotificationItem noti={"Thông báo 1"} />
        <NotificationItem noti={"Thông báo 2"} />
        <NotificationItem noti={"Thông báo 3"} />
        <NotificationItem noti={"Thông báo 4"} />
        <NotificationItem noti={"Thông báo 5"} />
        <NotificationItem noti={"Thông báo 6"} />
        <NotificationItem noti={"Thông báo 7"} />
        <NotificationItem noti={"Thông báo 8"} />
        <NotificationItem noti={"Thông báo 9"} />
        <NotificationItem noti={"Thông báo 10"} />
        <NotificationItem noti={"Thông báo 11"} />
        <NotificationItem noti={"Thông báo 12"} /> */}

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
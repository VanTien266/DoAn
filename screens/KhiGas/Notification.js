import React, {useState} from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import NotificationItem from "./Notification/NotficationItem";
import { SearchBar } from 'react-native-elements';

export default function Notification() {
  const [searchQuery, setSearchQuery] = useState('')
  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={query => setSearchQuery(query)}
        value={searchQuery}
      />

      <ScrollView>
        <NotificationItem noti={"Thông báo 1"} />
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
        <NotificationItem noti={"Thông báo 12"} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
import React, { useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { SearchBar } from 'react-native-elements';
import FanSettingItem from "./Setting/FanSettingItem";

export default function KhiGasSetting(props) {
  const [searchQuery, setSearchQuery] = useState('')
  const item = [
    <View>
      <FanSettingItem fanName={"Quạt thông gió 1"} />
      <FanSettingItem fanName={"Quạt thông gió 2"} />
      <FanSettingItem fanName={"Quạt thông gió 3"} />
      <FanSettingItem fanName={"Quạt thông gió 4"} />
      <FanSettingItem fanName={"Quạt thông gió 5"} />
      <FanSettingItem fanName={"Quạt thông gió 6"} />
      <FanSettingItem fanName={"Quạt thông gió 7"} />
      <FanSettingItem fanName={"Quạt thông gió 8"} />
      <FanSettingItem fanName={"Quạt thông gió 9"} />
      <FanSettingItem fanName={"Quạt thông gió 10"} />
      <FanSettingItem fanName={"Quạt thông gió 11"} />
      <FanSettingItem fanName={"Quạt thông gió 12"} />
    </View>
  ]

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={query => setSearchQuery(query)}
        value={searchQuery} />

      <ScrollView >
        {item}
      </ScrollView>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 60,
  },
})

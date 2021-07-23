import React from "react";
import { Text, View } from "react-native";

import TimeSetting from "./components/TimeSetting";

const Setting = () => {
  return (
    <View>
      <Text>Thiết lập thời gian bật/tắt</Text>
      <TimeSetting />
    </View>
  );
};

export default Setting;

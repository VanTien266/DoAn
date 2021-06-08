import { NavigationContainer } from "@react-navigation/native";
import React from "react";

import { Text } from "react-native";
import TabsCongTac from "../routes/BottomNav";

const CongTac = () => {
  return (
    <NavigationContainer>
      <TabsCongTac />
    </NavigationContainer>
  );
};

export default CongTac;

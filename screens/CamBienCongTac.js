import { NavigationContainer } from "@react-navigation/native";
import React from "react";

import TabsCongTac from "../routes/TabNavigator";

const CongTac = () => {
  return (
    <NavigationContainer>
      <TabsCongTac />
    </NavigationContainer>
  );
};

export default CongTac;

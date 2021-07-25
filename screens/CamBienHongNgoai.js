import { NavigationContainer } from "@react-navigation/native";
import React from "react";

import TabsHongNgoai from "../routes/HongNgoaiNavigator";

const HongNgoai = () => {
  return (
    <NavigationContainer>
      <TabsHongNgoai />
    </NavigationContainer>
  );
};

export default HongNgoai;

import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import KhiGasTab from "../routes/KhiGasNavigator";

const KhiGas = () => {
  return (
    <NavigationContainer>
      <KhiGasTab />
    </NavigationContainer>
  );
};

export default KhiGas;

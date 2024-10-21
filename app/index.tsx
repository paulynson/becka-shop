import { View, Text, StatusBar } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const index = () => {
  return (
    <SafeAreaView>
      {/* <StatusBar backgroundColor="blue" /> */}
      <View className="flex-1 items-center justify-center">
        <Text>BECKA'S SHOP</Text>
      </View>
    </SafeAreaView>
  );
};

export default index;

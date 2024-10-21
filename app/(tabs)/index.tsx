import { View, Text, SafeAreaView, StatusBar } from "react-native";
import React from "react";

const index = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <StatusBar />
      <SafeAreaView>
        <Text className="text-blue-600">BECKA'S SHOP</Text>
      </SafeAreaView>
    </View>
  );
};

export default index;

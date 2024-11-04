import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
// import icon from "../../assets/images/icon.png";

const account = () => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerLeft: () => (
            <>
              <View
                className="flex-row items-center gap-4 pl-6"
                style={{ paddingTop: insets.top + 20 }}
              >
                <TouchableOpacity
                  onPress={() => router.back()}
                  className="items-center justify-center w-12 h-12 bg-gray-100 rounded-full"
                >
                  <MaterialIcons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </>
          ),
        }}
      />

      <StatusBar />
      <View className="flex-1 bg-white ">
        <SafeAreaView
          className="px-8 mb-20 bg-white"
          style={{ marginTop: insets.top + 100 }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="items-center mx-12">
              <TextInput />

              <Image
                // source={{
                //   uri: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                // }}
                source={require("../../assets/images/pr.jpg")}
                className="w-32 h-32 border-2 border-green-600 rounded-full "
              />
              <Text className="mt-2 text-base text-gray-500">Jonny Morgan</Text>
              <Text className="mt-3 text-xl font-bold">
                jonnymorgan@gmail.com
              </Text>
            </View>

            {/* Personal Information Section */}
            <View className="px-3 py-4 my-5 rounded-lg shadow-2xl bg-green-50">
              <Text className="mb-3 text-lg font-bold">
                Personal Information
              </Text>

              <View className="flex-row items-center mb-3">
                <Ionicons name="call-outline" size={20} color="gray" />
                <Text className="ml-2 text-base text-black">+123 456 7890</Text>
              </View>

              <View className="flex-row items-center mb-3">
                <Ionicons name="location-outline" size={20} color="gray" />
                <Text className="ml-2 text-base text-black">New York, USA</Text>
              </View>

              <View className="flex-row items-center mb-3">
                <Ionicons
                  name="information-circle-outline"
                  size={20}
                  color="gray"
                />
                <Text className="ml-2 text-base text-black">
                  A short bio about John Doe goes here.
                </Text>
              </View>
            </View>

            {/* Settings Section */}
            <View className="px-3 py-4 my-5 rounded-lg shadow-2xl bg-green-50">
              <Text className="mb-3 text-lg font-bold">Settings</Text>

              <TouchableOpacity className="flex-row items-center py-3">
                <Ionicons name="notifications-outline" size={20} color="gray" />
                <Text className="ml-2 text-base text-black">Notifications</Text>
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center py-3">
                <Ionicons name="lock-closed-outline" size={20} color="gray" />
                <Text className="ml-2 text-base text-black">Privacy</Text>
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center py-3">
                <Ionicons name="shield-outline" size={20} color="gray" />
                <Text className="ml-2 text-base text-black">Security</Text>
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center py-3">
                <Ionicons name="help-circle-outline" size={20} color="gray" />
                <Text className="ml-2 text-base text-black">
                  Help & Support
                </Text>
              </TouchableOpacity>
            </View>

            {/* Log Out Button */}
            <TouchableOpacity
              className="flex-row items-center justify-center py-3 my-6 bg-green-600 rounded-full shadow-2xl "
              // onPress={() => auth.signOut()}
            >
              <Ionicons name="exit-outline" size={20} color="white" />
              <Text className="ml-2 text-lg font-bold text-white">Log Out</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </View>

      {/* </View> */}
    </>
  );
};

export default account;

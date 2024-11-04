import { Tabs } from "expo-router";
import React from "react";

import { TabBar } from "../components/TabBar";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#16a34a",
        tabBarInactiveTintColor: "#a3a3a3",
        headerShown: false,
        tabBarStyle: {
          position: "absolute",

          bottom: 24,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: "#dcfce7",
          borderTopWidth: 0,
          borderRadius: 50,
          marginHorizontal: 50,
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="explore" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="cart" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favourite"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="favorite" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="user" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

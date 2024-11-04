import { View, Text } from "react-native";
import React, { useEffect } from "react";

import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { ActivityIndicator } from "react-native";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store, persistor } from "@/app/redux/store";

const queryClient = new QueryClient();
const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "FsMe-Regular": require("../assets/fonts/FsMe-Regular.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }
  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

export default RootLayout;

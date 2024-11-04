import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  StatusBar,
} from "react-native";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { incrementQuantity, decrementQuantity } from "../redux";
import { FlashList } from "@shopify/flash-list";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";

const CheckoutPage = () => {
  const cart = useAppSelector((state) => state.store.cart);
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();

  const handleCheckout = () => {
    // This is a placeholder function for handling the checkout process.
    // You can replace it with actual logic for processing the checkout,
    // such as navigating to a payment page or integrating with a payment gateway.
    Alert.alert("Checkout", "Proceeding to checkout...");
  };

  const renderItem = ({ item }: any) => {
    return (
      <View className="flex-row items-center justify-between p-2 m-2 bg-white rounded-lg shadow">
        <Image
          source={{ uri: item.image }}
          style={{ width: 50, height: 50, borderRadius: 8 }}
        />
        <View className="flex-1 mx-3">
          <Text numberOfLines={1} style={{ fontWeight: "bold" }}>
            {item.title}
          </Text>
          <Text>₦{(item.price * 1700).toLocaleString()}</Text>
          <Text>
            Total: ₦{(item.price * item.quantity * 1700).toLocaleString()}
          </Text>
        </View>
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => dispatch(decrementQuantity(item.id))}
          >
            <Text style={{ fontSize: 20, padding: 5 }}>-</Text>
          </TouchableOpacity>
          <Text style={{ marginHorizontal: 10 }}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => dispatch(incrementQuantity(item.id))}
          >
            <Text style={{ fontSize: 20, padding: 5 }}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,

          headerTitle: `Checkout Page`,
          headerLeft: () => (
            <View className="" style={{}}>
              <TouchableOpacity
                onPress={() => router.back()}
                className="items-center justify-center w-8 h-8 mr-8 bg-green-100 rounded-full"
              >
                <MaterialIcons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />

      <StatusBar />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#f8f8f8",
          marginTop: insets.top + 40,
        }}
      >
        {cart.length === 0 ? (
          <View className="items-center justify-center flex-1">
            <Ionicons name="cart" size={100} color="gray" />
            <Text>Your cart is empty</Text>
          </View>
        ) : (
          <>
            <FlashList
              data={cart}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              estimatedItemSize={50}
              contentContainerStyle={{ padding: 10 }}
            />
            <View
              style={{
                padding: 20,
                borderTopWidth: 1,
                borderColor: "#ddd",
              }}
              className="flex-row items-center justify-between"
            >
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                Total Cart Value:
              </Text>
              <Text
                style={{ fontWeight: "bold", fontSize: 24 }}
                className="text-green-700"
              >
                ₦
                {cart
                  .reduce(
                    (sum, item) => sum + item.price * item.quantity * 1700,
                    0
                  )
                  .toLocaleString()}
              </Text>
            </View>
            <View className="mb-32">
              <TouchableOpacity
                style={{
                  backgroundColor: "#16a34a",
                  paddingVertical: 15,
                  borderRadius: 30,
                  marginHorizontal: 20,
                  alignItems: "center",
                }}
                onPress={handleCheckout}
              >
                <Text style={{ color: "white", fontSize: 18 }}>
                  Proceed to Checkout
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

export default CheckoutPage;

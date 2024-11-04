import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { incrementQuantity, decrementQuantity } from "../redux";
import { FlashList } from "@shopify/flash-list";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const Carts = () => {
  const cart = useAppSelector((state) => state.store.cart);
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();

  const renderItem = ({ item }: any) => {
    return (
      <View className="flex-row items-center justify-between p-2 m-2 bg-white rounded-lg shadow">
        {/* Product Image */}
        <Image
          source={{ uri: item.image }}
          style={{ width: 50, height: 50, borderRadius: 8 }}
        />

        {/* Product Details */}
        <View className="flex-1 mx-3">
          <Text numberOfLines={1} style={{ fontWeight: "bold" }}>
            {item.title}
          </Text>
          <Text>₦{(item.price * 1700).toLocaleString()}</Text>
          <Text>
            Total: ₦{(item.price * item.quantity * 1700).toLocaleString()}
          </Text>
        </View>

        {/* Quantity Controls */}
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
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#f8f8f8", marginTop: insets.top }}
    >
      {cart.length === 0 ? (
        <View className="items-center justify-center flex-1">
          <Ionicons name="cart" size={100} color="gray" />
          <Text> Cart is Empty</Text>
        </View>
      ) : (
        <>
          <View>
            <Text className="py-3 text-2xl font-bold text-center"> Cart</Text>
          </View>
          <FlashList
            data={cart}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            estimatedItemSize={50}
            contentContainerStyle={{ padding: 10 }}
          />
          <TouchableOpacity
            onPress={() => router.push("/checkout")}
            style={{
              backgroundColor: "#28a745",
              padding: 15,
              borderRadius: 20,
              justifyContent: "center",
              marginVertical: 10,
              alignItems: "center",
              marginHorizontal: 30,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Checkout</Text>
          </TouchableOpacity>
        </>
      )}
      <>
        {cart.length === 0 ? null : (
          <View className="mb-32">
            <View
              style={{ padding: 20, borderTopWidth: 1, borderColor: "#ddd" }}
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
            {/* Checkout Button */}
          </View>
        )}
      </>
    </SafeAreaView>
  );
};

export default Carts;

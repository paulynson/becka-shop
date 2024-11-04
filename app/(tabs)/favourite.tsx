import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromFavourite,
} from "../redux";
import { FlashList } from "@shopify/flash-list";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const Favourites = () => {
  const favourite = useAppSelector((state) => state.store.favorites);
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();

  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        className="relative flex-row items-center justify-between p-2 m-2 bg-white rounded-lg shadow"
        onPress={() => router.push(`/singleproduct/${item.id}` as any)}
      >
        <TouchableOpacity
          className="absolute top-0 right-0 z-50 items-center justify-center w-6 h-6 bg-red-500 rounded-full"
          onPress={() => dispatch(removeFromFavourite(item.id))}
        >
          {/* <Text className="text-white">X</Text> */}
          <Ionicons name="close" size={15} color="white" />
        </TouchableOpacity>
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
          <Text className="mt-2 text-lg font-bold text-green-600">
            ₦{(item.price * 1700).toLocaleString()}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#f8f8f8", marginTop: insets.top }}
    >
      {favourite.length === 0 ? (
        <View className="items-center justify-center flex-1">
          <Ionicons name="heart" size={100} color="gray" />
          <Text> No Favourite Items</Text>
        </View>
      ) : (
        <>
          <View>
            <Text className="py-3 text-2xl font-bold text-center">
              {" "}
              favourite
            </Text>
          </View>
          <FlashList
            data={favourite}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            estimatedItemSize={50}
            contentContainerStyle={{ padding: 10 }}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default Favourites;

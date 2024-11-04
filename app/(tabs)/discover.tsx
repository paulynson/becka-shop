import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  StatusBar,
  StatusBarStyle,
  Dimensions,
  Alert,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  addToFavourite,
  fetchProductsStart,
  fetchProductsSuccess,
  Product,
} from "@/app/redux";
import FetchProducts from "../api";
import { router, Stack } from "expo-router";
import { EvilIcons, Ionicons } from "@expo/vector-icons";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { addToCart } from "@/app/redux"; // Adjust path as needed

const Discover: React.FC = () => {
  const [hidden, setHidden] = useState(false);
  const { width } = Dimensions.get("window");
  const [statusBarStyle, setStatusBarStyle] =
    useState<StatusBarStyle>("default");

  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  const { products, loading, error } = useAppSelector((state) => state.store);

  const { data, status, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: FetchProducts,
  });

  useEffect(() => {
    dispatch(fetchProductsStart());
  }, [dispatch]);

  useEffect(() => {
    if (status === "success" && data) {
      dispatch(fetchProductsSuccess(data));
    }
  }, [status, data, dispatch]);

  const cart = useAppSelector((state) => state.store.cart);

  const renderItem = ({ item }: { item: Product }) => {
    const handleAddToCart = (item: Product) => {
      Alert.alert("Cart", `${item.title} added to cart`);
      dispatch(addToCart(item));
    };
    const handleAddToFavourite = (item: Product) => {
      Alert.alert("Favourite", `${item.title} added to cart`);
      dispatch(addToFavourite(item));
    };

    return (
      <View className="relative m-3" style={{ width: width / 2 - 16 }}>
        <TouchableOpacity
          onPress={() => router.push(`/singleproduct/${item.id}` as any)}
        >
          <TouchableOpacity
            className="absolute z-50 items-center justify-center w-6 h-6 ml-2 bg-green-500 rounded-full top-2 right-2 flex-2"
            onPress={() => handleAddToFavourite(item)}
          >
            <EvilIcons name="heart" color="white" size={15} />
          </TouchableOpacity>
          <Image
            source={{ uri: item.image }}
            className="object-cover w-full h-40 rounded-lg"
          />
        </TouchableOpacity>
        <View className="flex-row items-center justify-between px-2 my-2">
          {/* <View className="flex-row items-center justify-between"> */}
          <Text numberOfLines={1}>{item.title.toString().slice(0, 10)}</Text>
          <Text className="text-lg font-bold">
            ₦{(item.price * 1700).toLocaleString()}
          </Text>
          {/* </View> */}
        </View>

        <TouchableOpacity
          onPress={() => handleAddToCart(item)}
          className="w-full px-3 py-2 bg-green-600 rounded-full"
        >
          <Text className="text-center text-white">Add to Cart</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} className="relative">
        <StatusBar
          animated
          backgroundColor="#f6e6d9"
          barStyle={statusBarStyle}
          hidden={hidden}
        />
        <>
          {cart.length === 0 ? null : (
            <TouchableOpacity
              onPress={() => router.push("/cart" as any)}
              className="absolute z-50 items-center justify-center w-12 h-12 bg-red-500 rounded-full bottom-20 right-2"
            >
              <View className="relative"></View>
              <Ionicons name="cart-outline" size={24} color="white" />

              <View className="absolute bottom-[-8px] right-[-3px] items-center justify-center w-6 h-6 rounded-full bg-green-100">
                <Text className="">{cart.length}</Text>
              </View>
            </TouchableOpacity>
          )}
        </>

        <View>
          <Image
            source={require("../../assets/images/hero.jpg")}
            className="object-cover w-full h-64"
          />
        </View>
        <View
          className="flex-1 pb-32 bg-white"
          // style={{ marginTop: insets.top }}
        >
          <View
          // style={{ marginTop: insets.top }}
          >
            {loading || isLoading ? (
              <ActivityIndicator size="large" color="green" />
            ) : null}
          </View>

          <FlashList
            numColumns={2}
            estimatedItemSize={100} // Adjust this value based on item height
            showsVerticalScrollIndicator={false}
            data={data || []}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Discover;

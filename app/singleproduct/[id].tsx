import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { router, Stack, useLocalSearchParams } from "expo-router";
import axios from "axios";
import { EvilIcons, MaterialIcons } from "@expo/vector-icons";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { addToCart } from "../redux";
import { useAppDispatch } from "../redux/hooks";

const api = "https://fakestoreapi.com";

// Fetch function for a single product
const fetchSingleProduct = async (id: string) => {
  const response = await axios.get(`${api}/products/${id}`);
  return response.data;
};

const SingleProduct: React.FC = () => {
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams(); // Get the product ID from URL params

  // Ensure id is a string
  const productId = Array.isArray(id) ? id[0] : id; // Use the first element if id is an array

  const { data, isLoading, error } = useQuery({
    queryKey: ["product", productId], // Use a unique query key for the product
    queryFn: () => fetchSingleProduct(productId!), // Fetch the product data
  });

  // Show loading indicator while fetching data
  if (isLoading) {
    return <ActivityIndicator size="large" color="#ff6600" />;
  }

  // Handle error state
  if (error instanceof Error) {
    return <Text>Error: {error.message}</Text>;
  }

  const handleAddToCart = (item: any) => {
    dispatch(addToCart(item));
  };

  // Rendering the fetched product details
  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,

          headerTitle: `${data?.title.toString().slice(0, 15)}`,
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
        className="flex-1 bg-white "
        style={{ marginTop: insets.top - 40 }}
      >
        {/* Display the product details */}
        {data && (
          <SafeAreaView className="flex-1">
            <View className="border-2 border-gray-100 w-full rounded-2xl shadow-lg h-[60%] p-6">
              <Image
                source={{ uri: data.image }}
                className="object-cover w-full h-[100%]  shadow-lg rounded-lg border-2 border-gray-300 "
              />
            </View>
            <ScrollView showsVerticalScrollIndicator={false} className="p-6">
              <View className="flex-row items-center justify-between h-20 my-3">
                <View>
                  <Text className="flex-1 text-2xl font-bold">
                    {data?.title.toString().slice(0, 10)}
                  </Text>
                  <Text className="flex-1 text-xs font-bold text-gray-400">
                    {data?.category}
                  </Text>
                </View>
                <View>
                  <Text className="text-2xl font-bold text-black flex-2">
                    ₦
                    {(data.price * 1700)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </Text>
                </View>
              </View>
              <Text className="text-base leading-loose capitalize">
                {data.description}
              </Text>

              <TouchableOpacity
                className="flex-row items-center justify-center h-20 mt-6 mb-20 text-white bg-green-600 rounded-full"
                onPress={() => handleAddToCart(data)}
              >
                <EvilIcons name="cart" color="white" size={24} />

                <Text className="ml-2 text-lg text-white ">Add to Cart</Text>
              </TouchableOpacity>
            </ScrollView>
          </SafeAreaView>
        )}
      </SafeAreaView>
    </>
  );
};

export default SingleProduct;

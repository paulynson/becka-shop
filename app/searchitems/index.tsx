import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Stack, useRouter, useSegments } from "expo-router";
import { EvilIcons, MaterialIcons } from "@expo/vector-icons";
import { addToCart, addToFavourite, Product } from "../redux";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { FlashList } from "@shopify/flash-list";
import { useDispatch } from "react-redux";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const SearchPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const searchData: any = useAppSelector((state) => state.store.searchWord);
  const insets = useSafeAreaInsets();

  const { width } = Dimensions.get("window");

  useEffect(() => {
    const fetchSearchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://fakestoreapi.com/products`);
        const filteredProducts = response.data.filter((item: Product) =>
          item.title.toLowerCase().includes(searchData.toLowerCase())
        );
        setProducts(filteredProducts);
      } catch (error) {
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchSearchProducts();
  }, [searchData]);

  if (loading) {
    return (
      <SafeAreaView>
        <ActivityIndicator size="large" color="#16a34a" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView>
        <Text>{error}</Text>
      </SafeAreaView>
    );
  }
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
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: `SEARCH`,
          headerLeft: () => (
            <>
              <View
                className="flex-row items-center "
                style={{ paddingTop: insets.top - 20, paddingBottom: 20 }}
              >
                <TouchableOpacity
                  onPress={() => router.back()}
                  className="items-center justify-center w-12 h-12 mr-6 -mt-3 bg-green-200 rounded-full"
                >
                  <MaterialIcons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </>
          ),
        }}
      />

      <SafeAreaView style={{ flex: 1 }} className="">
        <StatusBar animated backgroundColor="#f6e6d9" />
        <View></View>
        <View
          className="flex-1 pb-32 bg-white"
          style={{ marginTop: insets.top, paddingBottom: insets.bottom + 20 }}
        >
          <View style={{ marginTop: insets.top + 40 }}>
            {loading ? <ActivityIndicator size="large" color="green" /> : null}
          </View>

          <FlashList
            numColumns={2}
            estimatedItemSize={100} // Adjust this value based on item height
            showsVerticalScrollIndicator={false}
            data={products || []}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default SearchPage;

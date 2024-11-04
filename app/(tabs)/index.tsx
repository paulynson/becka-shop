import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  fetchProductsStart,
  fetchProductsSuccess,
  Product,
  searchTextItem,
} from "../redux";
import { useAppDispatch } from "../redux/hooks";
import FetchProducts from "../api";
import { router } from "expo-router";
import { storeCat } from "../redux";

interface ProductProps {
  id: number;
  title: string;
  image?: string;
}

const Index = () => {
  const insets = useSafeAreaInsets();
  const [category, setCategory] = useState<string[]>([]);
  const [searchtext, setSearchtext] = useState<string>("");
  const dispatch = useAppDispatch();

  // Fetch products using React Query
  const { data, status, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: FetchProducts,
  });

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios("https://fakestoreapi.com/products/categories");
        setCategory(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    dispatch(fetchProductsStart());
    if (status === "success" && data) {
      dispatch(fetchProductsSuccess(data));
    }
  }, [status, data, dispatch]);

  // Navigate to the category page and fetch products for that category
  const navigateToCategory = (item: string) => {
    dispatch(storeCat(item));
    router.push(`/categories`);
  };

  const navigateToSearch = (item: string) => {
    dispatch(searchTextItem(item));
    router.push(`/searchitems`);
    setSearchtext("");
  };

  // Render product item
  const renderProductItem = ({ item }: { item: ProductProps }) => (
    <TouchableOpacity
      onPress={() => router.push(`/singleproduct/${item.id}` as any)}
      key={item.id}
      className="w-[320px] bg-gray-200 h-48 rounded-lg mr-8 border-2 border-green-100"
    >
      <Image
        source={{ uri: item?.image }}
        className="w-full h-full rounded-lg"
        resizeMode="cover"
      />
      <Text className="absolute px-2 py-1 text-xs font-bold text-white bg-green-600 rounded-full top-4 left-3">
        {item.title.slice(0, 10)}
      </Text>
    </TouchableOpacity>
  );

  const renderTopProductItem = ({ item }: { item: ProductProps }) => (
    <TouchableOpacity
      key={item.id}
      className="items-center p-4 mr-2"
      onPress={() => router.push(`/singleproduct/${item.id}` as any)}
    >
      <View className="items-center justify-center w-20 h-20 p-4 mb-2 bg-gray-100 rounded-full">
        <Image
          source={{ uri: item?.image }}
          className="w-16 h-16 rounded-full"
          resizeMode="cover"
        />
      </View>
      <Text>{item.title.slice(0, 10)}</Text>
    </TouchableOpacity>
  );

  // Loading and error handling
  if (isLoading) {
    return (
      <SafeAreaView style={{}}>
        <ActivityIndicator color="green" />
      </SafeAreaView>
    );
  }

  if (isError) {
    return <Text>Error fetching products</Text>;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar animated={true} backgroundColor="#16a34a" />
        <View className="flex-1 bg-white">
          <View
            className="w-full h-64 px-6 bg-green-600 rounded-b-3xl"
            style={{ paddingTop: insets.top + 80 }}
          >
            {/* Search Content */}
            <View className="flex-row items-center justify-between gap-3 mt-8">
              <View className="flex-row items-center flex-1 p-3 bg-white rounded-md">
                <TextInput
                  placeholder="Search any product..."
                  className="ml-2"
                  value={searchtext}
                  onChangeText={(text) => setSearchtext(text)}
                />
              </View>
              <TouchableOpacity
                className="p-3.5 bg-white rounded-md"
                onPress={() => navigateToSearch(searchtext)}
              >
                <AntDesign name="search1" size={20} color="green" />
              </TouchableOpacity>
            </View>
          </View>
          {/* Products Section */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="flex-1 mb-24"
          >
            {/* Categories */}
            <View className="p-6">
              <View className="flex-row items-center justify-between">
                <Text className="text-2xl font-bold">Categories</Text>
              </View>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {category.map((item: string, index: number) => (
                <TouchableOpacity
                  key={index}
                  className="py-4 mx-3 bg-gray-100 rounded-full px-9"
                  onPress={() => navigateToCategory(item)}
                >
                  <Text className="capitalize">{item}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            {/* Popular Products */}
            <View className="mt-6">
              <View className="p-6">
                <View className="flex-row items-center justify-between">
                  <Text className="text-2xl font-bold">Popular Products</Text>
                  <TouchableOpacity onPress={() => router.push("/discover")}>
                    <Text className="text-green-500">See All</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View className="px-6">
                <FlatList
                  data={data}
                  renderItem={renderProductItem}
                  keyExtractor={(item) => item.id.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  initialNumToRender={5}
                />
              </View>
            </View>
            {/* Top Products */}

            <View className="mt-6">
              <View className="p-6">
                <View className="flex-row items-center justify-between">
                  <Text className="text-2xl font-bold">Top Products</Text>

                  <TouchableOpacity onPress={() => router.push("/discover")}>
                    <Text className="text-green-500">See All</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View className="px-6">
                <FlatList
                  data={data}
                  renderItem={renderTopProductItem}
                  keyExtractor={(item) => item.id.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  initialNumToRender={5}
                />
              </View>
            </View>
            {/* Latest Products */}
            <View className="mt-6">
              <View className="p-6">
                <View className="flex-row items-center justify-between">
                  <Text className="text-2xl font-bold">Latest Products</Text>
                  <TouchableOpacity>
                    <Text className="text-green-500">See All</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View className="px-6">
                <FlatList
                  data={data}
                  renderItem={renderTopProductItem}
                  keyExtractor={(item) => item.id.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  initialNumToRender={15}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Index;

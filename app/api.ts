// api.ts
import axios from "axios";
import { Product } from "@/app/redux";
import { useLocalSearchParams } from "expo-router";

const api = "https://fakestoreapi.com";

const FetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get("https://fakestoreapi.com/products");
  return response.data;
};

// const FetchAllCategories = async (): Promise<Product[]> => {
//   const { id } = useLocalSearchParams();
//   const response = await axios.get(`${api}/products/categories`);
//   return response.data;
// };

export default FetchProducts;
// export default {FetchSingleProduct, FetchAllCategories};

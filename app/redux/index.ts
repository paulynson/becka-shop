import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Product type definition
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

// Cart item type definition with quantity
export interface CartItem extends Product {
  quantity: number;
}
export interface FavouriteItem extends Product {
  quantity: number;
}

// Store state type definition
export interface StoreState {
  products: Product[];
  cart: CartItem[];
  favorites: FavouriteItem[];
  loading: boolean;
  error: string | null;
  cat: string | null;
  searchWord: string | null;
}

// Initial state for the slice
const initialState: StoreState = {
  products: [],
  cart: [],
  favorites: [],
  loading: false,
  error: null,
  cat: "",
  searchWord: "",
};

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    // Action to add a product to the cart or increment quantity if it exists
    addToCart(state, action: PayloadAction<Product>) {
      const existingProduct = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    addToFavourite(state, action: PayloadAction<Product>) {
      const existingProduct = state.favorites.find(
        (item) => item.id === action.payload.id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.favorites.push({ ...action.payload, quantity: 1 });
      }
    },
    // Action to increment quantity of a product in the cart
    incrementQuantity(state, action: PayloadAction<number>) {
      const existingProduct = state.cart.find(
        (item) => item.id === action.payload
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      }
    },
    // Action to decrement quantity or remove product if quantity is 1
    decrementQuantity(state, action: PayloadAction<number>) {
      const existingProduct = state.cart.find(
        (item) => item.id === action.payload
      );

      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          existingProduct.quantity -= 1;
        } else {
          state.cart = state.cart.filter((item) => item.id !== action.payload);
        }
      }
    },
    // Action to remove a product from the cart
    removeFromFavourite(state, action: PayloadAction<number>) {
      state.favorites = state.favorites.filter(
        (item) => item.id !== action.payload
      );
    },
    // Action to remove a product from the favourite
    removeFromCart(state, action: PayloadAction<number>) {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    fetchProductsStart(state) {
      state.loading = true;
      state.error = null;
    },
    // Action for successful fetch (updates products array and sets loading to false)
    fetchProductsSuccess(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
      state.loading = false;
    },
    // Action for failed fetch (sets error message and stops loading)
    fetchProductsFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    storeCat: (state, action) => {
      state.cat = action.payload;
    },
    searchTextItem: (state, action) => {
      state.searchWord = action.payload;
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  storeCat,
  addToFavourite,
  removeFromFavourite,
  searchTextItem,
} = storeSlice.actions;

export default storeSlice.reducer;

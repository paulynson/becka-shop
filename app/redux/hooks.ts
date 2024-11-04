import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store"; // Ensure these are correctly defined in your store setup

// Custom hook to use dispatch with the correct type
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Custom hook to use selector with the correct type
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

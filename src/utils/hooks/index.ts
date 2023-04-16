import { TypedUseSelectorHook, useDispatch as dispatchHook, useSelector as selectorHook } from "react-redux";
import useForm from "./useForm";

import { RootState, AppDispatch, AppThunkAction, AppThunk } from "../../types/types";

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
// export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();

export const useDispatch = () => dispatchHook<AppDispatch>();

export { useForm };

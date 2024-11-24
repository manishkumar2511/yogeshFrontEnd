import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, PURGE } from "redux-persist";
import storage from "redux-persist/lib/storage";

import cartReducer from "./cartSlice";
import authReducer from "./authSlice";
import productReducer from "./productSlice";

const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  product: productReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE", PURGE],
      },
    }),
  devTools: import.meta.env.VITE_ENVIRONMENT === "development",
});


export const persistor = persistStore(store);

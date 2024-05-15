import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import userReducer from "./user/userSlice.js";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import themeReducer from "./theme/themeSlice.js";
const rootReducer = combineReducers({    // If we have more than one reducer we need to combine reducers
  user: userReducer,
  theme:themeReducer,
});

const persistConfig = {
  key: "root", // name of the key in local storage
  storage,
  version: 1,  
};
const persistedReducer = persistReducer(persistConfig, rootReducer); 
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>   // If we dont use this we will get an error
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

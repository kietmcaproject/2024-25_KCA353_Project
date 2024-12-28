// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import userReducer from '@/lib/Redux/slices/userSlice'; // Import your user reducer
import { combineReducers } from 'redux';

// Redux persist configuration
const persistConfig = {
  key: 'root', // Key for persisting the store
  storage, // Default storage is localStorage
};

// Combine your reducers
const rootReducer = combineReducers({
  user: userReducer, // Add user slice here
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store to use the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for redux-persist
    }),
});

// Persistor
export const persistor = persistStore(store);

// Define RootState type
export type RootState = ReturnType<typeof store.getState>; // This gets the type of the root state

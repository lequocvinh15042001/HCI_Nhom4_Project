import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';

import cartReducer from './slice/cartSlice';
import categoriesReducer from './slice/categoriesSlice';
import modalReducer from './slice/modalSlice';
import ordersReducer from './slice/ordersSlice';
import productsReducer from './slice/productsSlice';
import reviewsReducer from './slice/reviewsSlice';
import statisticalReducer from './slice/statisticalSlice';
import userReducer from './slice/userSlice';

const persistConfig = {
    key: 'tlcnFE2022',
    storage,
    blacklist: [
        'cart',
        'categories',
        'modal',
        'orders',
        'products',
        'reviews',
        'statistical',
    ],
};

const rootReducer = combineReducers({
    cart: cartReducer,
    categories: categoriesReducer,
    modal: modalReducer,
    orders: ordersReducer,
    products: productsReducer,
    reviews: reviewsReducer,
    statistical: statisticalReducer,
    user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
});

export const persistor = persistStore(store);

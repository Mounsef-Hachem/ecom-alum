import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './User/user.reducer';
import productReducer from './Product/product.reducer';
import cartReducer from './Cart/cart.reducer';
import ordersReducer from './Orders/orders.reducer';
import categoriesReducer from './Categories/categories.reducer';

export const rootReducer = combineReducers({
    user: userReducer,
    productsData: productReducer,
    cartData: cartReducer,
    ordersData: ordersReducer,
    categoriesData: categoriesReducer
});

const configStorage = {
    key: 'root',
    storage,
    whitelist: ['cartData', 'user']
};

export default persistReducer(configStorage, rootReducer);
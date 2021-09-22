import { auth } from './../../firebase/utils';
import { takeLatest, put, call, all } from 'redux-saga/effects';
import { setProducts, setProduct, fetchProductsStart } from './product.actions';
import productTypes from './product.types';
import { handleAddProduct, handleFetchProducts, handleDeleteProduct, handleFetchProduct } from './product.helpers';

export function* addProduct({ payload }) {
    try {
        console.log('test');
        const timeStamp = new Date();
        yield handleAddProduct({
            ...payload,
            productAdminUserUID: auth.currentUser.uid,
            createdDate: timeStamp
        });

        yield put(fetchProductsStart());
    } catch (err) {
        console.log(err);
    }
}

export function* onAddProductStart() {
    yield takeLatest(productTypes.ADD_NEW_PRODUCT_START, addProduct);
}

export function* fetchProducts({ payload }) {
    try {
        const products = yield handleFetchProducts(payload);
        yield put(
            setProducts(products)
        );
    } catch (err) {
        //console.log(err);
    }
}

export function* onFetchProductsStart() {
    yield takeLatest(productTypes.FETCH_PRODUCTS_START, fetchProducts);
}

export function* deleteProduct({ payload }) {
    try {
        yield handleDeleteProduct(payload);
        yield put(
            fetchProductsStart()
        );
    } catch (err) {
        //console.log(err);
    }
}

export function* onDeleteProductStart() {
    yield takeLatest(productTypes.DELETE_PRODUCT_START, deleteProduct);
}

export function* fetchProduct({ payload }) {
    try {
        const product = yield handleFetchProduct(payload);
        yield put(
            setProduct(product)
        );
    } catch (err) {
        //console.log(err);
    }
}

export function* onFetchProductStart() {
    yield takeLatest(productTypes.FETCH_PRODUCT_START, fetchProduct);
}

export default function* productSagas() {
    yield all([
        call(onAddProductStart),
        call(onFetchProductsStart),
        call(onDeleteProductStart),
        call(onFetchProductStart),
    ])
}
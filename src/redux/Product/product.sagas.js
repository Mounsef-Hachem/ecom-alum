import {auth} from './../../firebase/utils';
import {takeLatest, put, call, all} from 'redux-saga/effects';
import {setProducts, fetchProductsStart} from './product.actions';
import productTypes from './product.types';
import {handleAddProduct, handleFetchProducts, handleDeleteProduct} from './product.helpers';

export function* addProduct({payload: {
    productCategory,
    productName,
    productThumbnail,
    productPrice,
    productDesc
}}) {
    try{
        const timeStamp = new Date();
        yield handleAddProduct({
            productCategory,
            productName,
            productThumbnail,
            productPrice,
            productDesc,
            productAdminUserUID: auth.currentUser.uid,
            createdDate: timeStamp
        });

        yield put(fetchProductsStart());
    }catch(err){
        //console.log(err);
    }
}

export function* onAddProductStart() {
    yield takeLatest(productTypes.ADD_NEW_PRODUCT_START, addProduct);
}

export function* fetchProducts(){
    try{
        const products = yield handleFetchProducts();
        yield put (
            setProducts(products)
        );
    }catch(err){
        //console.log(err);
    }
}

export function* onFetchProductsStart() {
    yield takeLatest(productTypes.FETCH_PRODUCTS_START, fetchProducts);
}

export function* deleteProduct({payload}) {
    try{
        yield handleDeleteProduct(payload);
        yield put (
            fetchProductsStart()
        );
    }catch(err){
        //console.log(err);
    }
}

export function* onDeleteProductStart() {
    yield takeLatest(productTypes.DELETE_PRODUCT_START, deleteProduct);
}

export default function* productSagas() {
    yield all([
        call(onAddProductStart),
        call(onFetchProductsStart),
        call(onDeleteProductStart)
    ])
}
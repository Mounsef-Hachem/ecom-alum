import { all, call } from 'redux-saga/effects';

import userSagas from './User/user.sagas';
import productSagas from './Product/product.sagas';
import ordersSagas from './Orders/orders.sagas';
import categoriesSagas from './Categories/categories.sagas';

export default function* rootSaga() {
    yield all([
        call(userSagas),
        call(productSagas),
        call(ordersSagas),
        call(categoriesSagas)
    ])
}
import ordersTypes from "./orders.types";
import { call, put, all, takeLatest } from "@redux-saga/core/effects";
import { handleGetOrder, handleGetUserOrderHistory, handleSaveOrders, handleGetAllOrderHistory } from "./orders.helpers";
import { auth } from './../../firebase/utils';
import { clearCart } from "../Cart/cart.actions";
import { setOrderDetails, setOrderHistory } from './orders.actions';

export function* saveOrder({ payload }) {
    try {
        const timestamps = new Date();
        yield handleSaveOrders({
            ...payload,
            orderUserID: auth.currentUser.uid,
            orderCreatedDate: timestamps
        });
        yield put(clearCart())
    } catch (err) {
        console.log(err);
    }
}

export function* onSaveOrderHistoryStart() {
    yield takeLatest(ordersTypes.SAVE_ORDER_HISTORY_START, saveOrder);
};

export function* getUserOrderHistory({ payload }) {
    try {
        const history = yield handleGetUserOrderHistory(payload);
        yield put(setOrderHistory(history));
    } catch (err) {
        //console.log(err);
    }
}

export function* onGetUserOrderHistoryStart() {
    yield takeLatest(ordersTypes.GET_USER_ORDER_HISTORY_START, getUserOrderHistory);
}

export function* getAllOrderHistory({ payload }) {
    try {
        const history = yield handleGetAllOrderHistory(payload);
        yield put(setOrderHistory(history));
    } catch (err) {
        //console.log(err);
    }
}

export function* onGetAllOrderHistoryStart() {
    yield takeLatest(ordersTypes.GET_ALL_ORDER_HISTORY_START, getAllOrderHistory);
}

export function* getOrderDetails({ payload }) {
    try {
        const order = yield handleGetOrder(payload);
        yield put(
            setOrderDetails(order)
        );
    } catch (err) {
        //console.log(err);
    }
}

export function* onGetOrderDetailsStart() {
    yield takeLatest(ordersTypes.GET_ORDER_DETAILS_START, getOrderDetails);
}

export default function* ordersSagas() {
    yield all([
        call(onSaveOrderHistoryStart),
        call(onGetUserOrderHistoryStart),
        call(onGetOrderDetailsStart),
        call(onGetAllOrderHistoryStart)
    ])
}
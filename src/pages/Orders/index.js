import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrderHistory, setOrderHistory } from '../../redux/Orders/orders.actions';
import OrderHistory from '../../components/OrderHistory';

const mapState = ({ user, ordersData }) => ({
    currentUser: user.currentUser,
    orderHistory: ordersData.orderHistory.data
})

const Orders = props => {
    const dispatch = useDispatch();
    const { currentUser, orderHistory } = useSelector(mapState);

    useEffect(() => {
        dispatch(getUserOrderHistory(currentUser.id));
        return () => {
            dispatch(setOrderHistory([]));
        }
    }, []);

    return (
        <>
            <OrderHistory orders={orderHistory} />
        </>
    );
};

export default Orders;
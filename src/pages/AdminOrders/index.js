import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ManageOrders from '../../components/ManageOrders';
import PageHeader from '../../components/PageHeader';
import { getAllOrderHistory, setOrderHistory } from '../../redux/Orders/orders.actions';

const mapState = ({ ordersData }) => ({
    orders: ordersData.orderHistory.data
});


const AdminOrders = () => {
    const dispatch = useDispatch();
    const { orders } = useSelector(mapState);

    useEffect(() => {
        dispatch(
            getAllOrderHistory()
        );
        return () => {
            dispatch(setOrderHistory([]));
        }
    }, []);

    return (
        <div className="container">
            <PageHeader title={"Manage Orders"} />
            <ManageOrders orders={orders} />
        </div>
    )
};

export default AdminOrders;
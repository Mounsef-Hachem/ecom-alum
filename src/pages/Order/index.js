import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { getOrderDetailsStart } from '../../redux/Orders/orders.actions';
import { useDispatch, useSelector } from 'react-redux';
import OrderDetails from '../../components/OrderDetails';

const mapState = ({ ordersData }) => ({
    orderDetails: ordersData.orderDetails
})

const Order = () => {
    const { orderID } = useParams();
    const dispatch = useDispatch();
    const { orderDetails } = useSelector(mapState);
    const { orderTotal } = orderDetails;

    useEffect(() => {
        dispatch(
            getOrderDetailsStart(orderID)
        );
    }, [])

    return (
        <div>
            <OrderDetails order={orderDetails} orderID={orderID} orderTotal={orderTotal} back={true} />
        </div>
    );
}

export default Order;
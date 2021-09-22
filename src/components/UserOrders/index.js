import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import moment from 'moment';
import OrderDetails from './../OrderDetails';
import { getUserOrderHistory, setOrderHistory } from '../../redux/Orders/orders.actions';

import { useDispatch, useSelector } from 'react-redux';

const mapState = ({ ordersData }) => ({
    orderHistory: ordersData.orderHistory.data
})


const UserOrders = ({ id }) => {
    const dispatch = useDispatch();
    const { orderHistory } = useSelector(mapState);

    const [columns, setColumns] = useState([
        { title: 'Order', field: 'documentID', editable: 'never', render: rowData => `#${rowData.documentID}` },
        { title: 'Date', field: 'orderCreatedDate', editable: 'never', render: rowData => moment(rowData.orderCreatedDate.nano).format('DD/MM/YYYY') },
        { title: 'State', field: 'orderState' },
        { title: 'Total', field: 'orderTotal', editable: 'never' },
    ]);
    const [orders, setOrders] = useState([]);

    const handleUpdateOrder = (newData, oldData) => {
        return new Promise((resolve, reject) => {

        })
    }

    useEffect(() => {
        dispatch(getUserOrderHistory(id));
        return () => {
            dispatch(setOrderHistory([]));
            setOrders([]);
        }
    }, [])

    useEffect(() => {
        setOrders(orderHistory);
        return () => {
            setOrders([]);
        }
    }, [orderHistory])

    return (
        <>
            {(Array.isArray(orders) ? (
                orders.length > 0 ? (<MaterialTable
                    title="Orders"
                    columns={columns}
                    data={orders}
                    editable={{
                        onRowUpdate: (newData, oldData) => handleUpdateOrder(newData, oldData),
                    }}
                    detailPanel={rowData => {
                        return (
                            <div
                                style={{
                                    padding: 10,
                                }}
                            >
                                <OrderDetails order={rowData} orderID={rowData.documentID} orderTotal={rowData.orderTotal} back={false} />
                            </div>
                        )
                    }}
                    options={{
                        detailPanelType: 'single',
                    }}
                    onRowClick={(event, rowData, togglePanel) => togglePanel()}
                />) : (<span>No orders.</span>)) : (
                <span>...</span>
            ))}
        </>
    )
}

export default UserOrders;
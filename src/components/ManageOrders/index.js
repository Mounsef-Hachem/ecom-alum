import React, { useState } from 'react';
import MaterialTable from 'material-table';
import moment from 'moment';
import OrderDetails from './../OrderDetails';

const ManageOrders = ({ orders }) => {
    const [columns, setColumns] = useState([
        { title: 'Order', field: 'documentID', editable: 'never', render: rowData => `#${rowData.documentID}` },
        { title: 'Date', field: 'orderCreatedDate', editable: 'never', render: rowData => moment(rowData.orderCreatedDate.nano).format('DD/MM/YYYY') },
        { title: 'State', field: 'orderState' },
        { title: 'Total', field: 'orderTotal', editable: 'never' },
    ]);

    const handleUpdateOrder = (newData, oldData) => {
        return new Promise((resolve, reject) => {

        })
    }

    return (
        <MaterialTable
            title="Orders"
            columns={columns}
            data={orders}
            editable={{
                onRowUpdate: (newData, oldData) => handleUpdateOrder(newData, oldData),
            }}
            detailPanel={rowData => {
                console.log(rowData.orderTotal);
                return (
                    <div
                        style={{
                            fontSize: 100,
                            padding: 20,
                            backgroundColor: '#ffd333'
                        }}
                    >
                        <OrderDetails order={rowData} orderID={rowData.documentID} orderTotal={rowData.orderTotal} back={false} />
                    </div>
                )
            }}
            options={{
                exportButton: true,
                detailPanelType: 'single',
            }}
            onRowClick={(event, rowData, togglePanel) => togglePanel()}
        />
    )
}

export default ManageOrders;
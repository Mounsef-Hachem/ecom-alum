import React, { useEffect } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableBody, TableCell } from '@material-ui/core';
import moment from 'moment';
import { useHistory } from 'react-router';
import { setOrderHistory } from '../../redux/Orders/orders.actions';

const columns = [
    {
        id: 'orderCreatedDate',
        lable: 'Date'
    },
    {
        id: 'documentID',
        lable: 'Order'
    },
    {
        id: 'orderTotal',
        lable: 'Total'
    }
];

const styles = {
    fontSize: '16px',
    cursor: 'pointer',
    width: '10%'
};

const formatText = (columnName, columnValue, orderItems) => {
    switch (columnName) {
        case "orderTotal":
            return `${columnValue} Dhs for ${orderItems.length} item(s)`;
        case "orderCreatedDate":
            return moment(columnValue.nano).format('DD/MM/YYYY');
        default:
            return columnValue;
    }
};

const OrderHistory = ({ orders }) => {
    const history = useHistory();

    return (
        <div className="card">
            <div className="card-header"><h5>Order History</h5></div>
            <div className="card-divider"></div>
            <div className="card-table">
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {columns.map((column, pos) => {
                                    const { lable } = column;
                                    return (
                                        <TableCell key={pos} style={styles}>
                                            {lable}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(Array.isArray(orders) && orders.length > 0) && orders.map((row, pos) => {
                                const { documentID, orderItems } = row;
                                return (
                                    <TableRow key={pos} onClick={() => history.push(`/account/order/${documentID}`)}>
                                        {columns.map((column, pos) => {
                                            const columnName = column.id;
                                            const columnValue = row[columnName];
                                            const formatedText = formatText(columnName, columnValue, orderItems);
                                            return (
                                                <TableCell key={pos} style={styles}>
                                                    {formatedText}
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default OrderHistory;
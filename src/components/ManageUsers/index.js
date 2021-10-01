import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import moment from 'moment';
import { Chip } from '@material-ui/core';
import UserOrders from '../UserOrders';

const ManageUsers = ({ users }) => {
    const [columns, setColumns] = useState([
        { title: 'Name', field: 'displayName' },
        { title: 'Date', field: 'createdDate', editable: 'never', render: rowData => moment(rowData.createdDate.nano).format('DD/MM/YYYY') },
        { title: 'Email', field: 'email' },
        {
            title: 'Roles', field: 'userRoles', render: rowData => <div>{
                rowData.userRoles.map((role, index) => {
                    return (
                        <Chip
                            key={index}
                            label={role}
                            style={{ marginRight: 10 }}
                        />)
                })
            }

            </div>
        },
    ]);

    const handleUpdateOrder = (newData, oldData) => {
        return new Promise((resolve, reject) => {

        })
    }

    return (
        <MaterialTable
            title={`${Array.isArray(users) ? users.length : "0"} Users`}
            columns={columns}
            data={users}
            editable={{
                onRowUpdate: (newData, oldData) => handleUpdateOrder(newData, oldData),
            }}
            detailPanel={rowData => {
                return (
                    <div
                        style={{
                            padding: 20,
                            backgroundColor: '#ffd333'
                        }}
                    >
                        <UserOrders id={rowData.documentID} />
                    </div>
                )
            }}
            onRowClick={(event, rowData, togglePanel) => togglePanel()}
            options={{
                exportButton: true,
                detailPanelType: 'single',
            }}
        />
    )
}

export default ManageUsers;
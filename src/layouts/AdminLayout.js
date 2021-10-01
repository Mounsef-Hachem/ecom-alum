import React from 'react';
import AdminSideBar from './../components/AdminSideBar';

const AdminLayout = props => {
    return (
        <div style={
            { display: "flex", position: "relative", height: "100%" }
        }
        >
            <AdminSideBar />
            <div className="main">
                {props.children}
            </div>
        </div>
    );
};

export default AdminLayout;
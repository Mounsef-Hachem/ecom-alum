import React from 'react';
import { useSelector } from 'react-redux';
import './styles.scss';
import PageHeader from './../../components//PageHeader';

import AdminProfile from './../../components/AdminProfile';

const mapState = ({ user }) => ({
    currentUser: user.currentUser
})


const Admin = props => {

    const { currentUser } = useSelector(mapState);

    const configAdminProfile = {
        currentUser
    }

    return (
        <div className="container">
            <PageHeader title={"Dashboard"} />
            <AdminProfile {...configAdminProfile} />
        </div>
    )
}

export default Admin;
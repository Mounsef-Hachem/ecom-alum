import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ManageUsers from '../../components/ManageUsers';
import PageHeader from '../../components/PageHeader';
import { fetchUsersStart } from '../../redux/User/user.actions';

const mapState = ({ user }) => ({
    users: user.users.data
});


const AdminUsers = () => {
    const dispatch = useDispatch();
    const { users } = useSelector(mapState);

    useEffect(() => {
        dispatch(
            fetchUsersStart()
        );
    }, []);

    return (
        <div className="container">
            <PageHeader title={"Manage Users"} />
            <ManageUsers users={users} />
        </div>
    )
};

export default AdminUsers;
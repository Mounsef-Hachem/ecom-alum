import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {checkUserIsAdmin} from './../../Utils';
import './styles.scss';

const mapState = ({ user }) => ({
    currentUser: user.currentUser
})

const AdminToolbar = props => {
    const {currentUser} = useSelector(mapState);   

    const isAdmin = checkUserIsAdmin(currentUser);

    if(!isAdmin) return null;

    return (
        <div className="adminToolbar">
            <div className="adminToolbar-wrap container">
                <div className="adminToolbar-row">
                    <div className="adminToolbar-item">
                    <Link className="adminToolbar-link" to="/admin">
                        My Admin
                    </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminToolbar;
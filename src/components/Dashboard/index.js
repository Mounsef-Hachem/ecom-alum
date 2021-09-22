import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrderHistory } from '../../redux/Orders/orders.actions';
import PageHeader from '../../components/PageHeader';

import './styles.scss';
import OrderHistory from '../../components/OrderHistory';

const mapState = ({ user, ordersData }) => ({
    currentUser: user.currentUser,
    orderHistory: ordersData.orderHistory.data
})

const Dashboard = props => {
    const dispatch = useDispatch();
    const { currentUser, orderHistory } = useSelector(mapState);

    useEffect(() => {
        dispatch(getUserOrderHistory(currentUser.id));
    }, []);

    return (
        <div className="dashboard">
            <div className="dashboard__profile card profile-card">
                <div className="card-body profile-card__body">
                    <div className="profile-card__avatar"><img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="" /></div>
                    <div class="profile-card__name">
                        Helena Garcia
                    </div>
                    <div class="profile-card__email">
                        stroyka@example.com
                    </div>
                </div>
            </div>
            <div className="dashboard__orders">
                <OrderHistory orders={orderHistory} />
            </div>
        </div>
    );
};

export default Dashboard;
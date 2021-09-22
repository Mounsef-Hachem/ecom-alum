import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles.scss';

const AccountNavigation = ({ }) => {
    return (
        <div className="account-nav flex-grow-1">
            <h4 className="account-nav__title">
                Navigation
            </h4>
            <ul>
                <li className="account-nav__item">
                    <NavLink exact={true} activeClassName="account-nav__item--active" to="/account">
                        Dashboard
                    </NavLink>
                </li>
                <li className="account-nav__item">
                    <NavLink activeClassName="account-nav__item--active" to="/account/orders">
                        Order History
                    </NavLink>
                </li>
            </ul>
        </div>
    )
};

export default AccountNavigation;
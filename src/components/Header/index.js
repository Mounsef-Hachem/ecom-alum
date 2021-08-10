import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './styles.scss';
import { Link } from 'react-router-dom';
import {signOutUserStart} from './../../redux/User/user.actions';

import Logo from './../../assets/logo.png';

const mapState = ({ user }) => ({
    currentUser: user.currentUser
});

const Header = props => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector(mapState);

    const signOut = () => {
        dispatch(signOutUserStart());
    };

    return (
        <header className="header">
            <div className="wrap container">
                <div className="nav-row">
                    <div className="nav-logo">
                        <Link to="/">
                            <img src={Logo} alt="Alumen" />
                        </Link>
                    </div>
                    <div className="nav-links">
                        <ul>
                            <li>
                                <Link to="/">
                                    <span>Home</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/">
                                    <span>Products</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/">
                                    <span>Contact Us</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="nav-indicators">

                        {!currentUser && (
                            <ul>
                                <li>
                                    <Link to="/registration">
                                        <span>Register</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/login">
                                        <span>Login</span>
                                    </Link>
                                </li>
                            </ul>
                        )}

                        {currentUser && (
                            <ul>
                                <li>
                                    <Link to="/dashboard">
                                        <span>My Account</span>
                                    </Link>
                                </li>
                                <li>
                                    <a><span onClick={() => signOut()}>Logout</span></a>
                                </li>
                            </ul>
                        )}

                    </div>
                </div>
            </div>
        </header>
    );
};

Header.defaultProps = {
    currentUser: null
};

export default Header;
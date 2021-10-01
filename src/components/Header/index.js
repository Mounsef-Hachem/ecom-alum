import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './styles.scss';
import { Link } from 'react-router-dom';
import { signOutUserStart } from './../../redux/User/user.actions';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { selectCartItemsCount } from '../../redux/Cart/cart.selectors';

import Logo from './../../assets/logo.png';
import ToolBar from '../ToolBar';

const mapState = (state) => ({
    currentUser: state.user.currentUser,
    totalNumberCartItems: selectCartItemsCount(state)
});

const Header = props => {
    const dispatch = useDispatch();
    const { currentUser, totalNumberCartItems } = useSelector(mapState);

    const [isSticky, setIsSticky] = useState(false);
    const ref = useRef();

    const toggleSticky = useCallback(
        ({ top, bottom }) => {
            console.log(top + " " + bottom);
            if (bottom <= 0) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        },
        [isSticky]
    );

    useEffect(() => {
        const handleScroll = () => {
            toggleSticky(ref.current.getBoundingClientRect());
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const signOut = () => {
        dispatch(signOutUserStart());
    };

    return (
        <header className="site__header d-lg-block d-none">
            <div className="site-header">
                <div ref={ref} className="site-header__topbar topbar">
                    <ToolBar />
                </div>
                <div className="site-header__nav-panel">
                    <div className={`nav-panel ${isSticky && "nav-panel--stuck nav-panel--show"}`}>
                        <div className="nav-panel__container container">
                            <div className="nav-panel__row">
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
                                            <Link to="/search">
                                                <span>Products</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/contact">
                                                <span>Contact Us</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="nav-indicators">
                                    <div className="indicator">
                                        <Link to="/cart" className="indicator-button">
                                            <span className="indicator-area">
                                                <AiOutlineShoppingCart size={20} />
                                                <span className="indicator-value">
                                                    {totalNumberCartItems}
                                                </span>
                                            </span>
                                        </Link>
                                    </div>

                                    <ul>
                                        {!currentUser && [
                                            <li>
                                                <Link to="/registration">
                                                    <span>Register</span>
                                                </Link>
                                            </li>,
                                            <li>
                                                <Link to="/login">
                                                    <span>Login</span>
                                                </Link>
                                            </li>
                                        ]}

                                        {currentUser && [
                                            <li>
                                                <Link to="/account">
                                                    <span>My Account</span>
                                                </Link>
                                            </li>,
                                            <li>
                                                <Link to=""><span onClick={() => signOut()}>Logout</span></Link>
                                            </li>
                                        ]}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header >
    );
};

Header.defaultProps = {
    currentUser: null
};

export default Header;
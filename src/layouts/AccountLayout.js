import React from 'react';
import Header from './../components/Header';
import Footer from './../components/Footer';
import PageHeader from './../components/PageHeader';
import AccountNavigation from '../components/AccountNavigation';

const AccountLayout = props => {
    return (
        <div>
            <Header {...props} />
            <div className="main">
                <PageHeader title={"My Account"} />
                <div className="block">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-lg-3 d-flex">
                                <AccountNavigation />
                            </div>
                            <div className="col-12 col-lg-9 mt-4 mt-lg-0">
                                {props.children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AccountLayout;
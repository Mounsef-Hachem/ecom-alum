import React from 'react';
import './styles.scss';
import SignIn from './../../components/SignIn';
import PageHeader from '../../components/PageHeader';

const Login = props => {
    const title = "Login";

    return [
        <PageHeader title={title} />,
        <div className="container">
            <SignIn />
        </div>
    ];
}

export default Login;
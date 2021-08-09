import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import './styles.scss';

import { auth, signInWithGoogle } from './../../firebase/utils';

const SignIn = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const resetForm = () => {
        setEmail('');
        setPassword('');
    }

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            await auth.signInWithEmailAndPassword(email, password);
            resetForm();
            props.history.push('/');
        } catch (err) {
            //console.log(err);
        }
    }

    return (
        <div className="signin" >
            <div className="row">
                <div className="col-md-6 d-flex flex-column">
                    <div className="card flex-grow-1 mb-md-0">
                        <div className="card-body">
                            <h3 className="card-title"> Login</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="login-email">Email address</label>
                                    <input id="login-email" onChange={e => setEmail(e.target.value)} type="email" value={email} name="email" placeholder="Enter email" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="login-password">Password</label>
                                    <input id="login-password" onChange={e => setPassword(e.target.value)} type="password" value={password} name="password" placeholder="Password" className="form-control" />
                                    <small className="form-text text-muted"><Link to="/recovery">Forgotten Password</Link></small>
                                </div>
                                <button type="submit" className="btn btn-primary mt-4">
                                    Login
                                    </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 d-flex flex-column">
                    <div className="card flex-grow-1 mb-md-0">
                        <div className="card-body">
                            <div>
                                <button onClick={signInWithGoogle} className="btn btn-primary mt-4">
                                    Sign in with Google
                                    </button>
                                <br />
                                <button onClick={signInWithGoogle} className="btn btn-primary mt-4">
                                    Sign in with Facebook
                                    </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );


}

export default withRouter(SignIn);
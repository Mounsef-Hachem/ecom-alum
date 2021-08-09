import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

import { auth, signInWithGoogle } from './../../firebase/utils';

const initialState = {
    email: '',
    password: ''
}

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = async e => {
        e.preventDefault();
        const { email, password } = this.state;
        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({
                ...initialState
            });
        } catch (err) {
            //console.log(err);
        }
    }

    render() {
        const { email, password } = this.state;
        return (
            <div className="signin" >
                <div className="row">
                    <div className="col-md-6 d-flex flex-column">
                        <div className="card flex-grow-1 mb-md-0">
                            <div className="card-body">
                                <h3 className="card-title"> Login</h3>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="login-email">Email address</label>
                                        <input id="login-email" onChange={this.handleChange} type="email" value={email} name="email" placeholder="Enter email" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="login-password">Password</label>
                                        <input id="login-password" onChange={this.handleChange} type="password" value={password} name="password" placeholder="Password" className="form-control" />
                                        <small class="form-text text-muted"><Link to="/recovery">Forgotten Password</Link></small>
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

}

export default SignIn;
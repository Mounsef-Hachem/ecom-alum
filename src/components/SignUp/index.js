import React, { Component } from 'react';
import { auth, handleUserProfile } from './../../firebase/utils';
import './styles.scss';
import { catchClause } from '@babel/types';

const initialState = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: []
}

class SignUp extends Component {

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

    handleFormSubmit = async event => {
        event.preventDefault();
        const { displayName, email, password, confirmPassword, errors } = this.state;

        if (password != confirmPassword) {
            const err = ['Passwords Don\'t match'];
            this.setState({
                errors: err
            })
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await handleUserProfile(user, { displayName });
            this.setState({
                ...initialState
            });
        } catch (err) {
            //console.log(err);
        }
    }

    render() {
        const { displayName, email, password, confirmPassword, errors } = this.state;
        return (
            <div className="signup">
                <div className="row">
                    <div className="col-md-6 d-flex flex-column">
                        <div className="card flex-grow-1 mb-md-0">
                            <div className="card-body">
                                <h3 className="card-title"> Register</h3>
                                <form onSubmit={this.handleFormSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="login-fullname">Full Name</label>
                                        <input id="login-fullname" value={displayName} name="displayName" onChange={this.handleChange} type="text" placeholder="Enter Full Name" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="register-email">Email address</label>
                                        <input id="register-email" value={email} type="email" name="email" onChange={this.handleChange} placeholder="Enter email" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="register-password">Password</label>
                                        <input id="register-password" value={password} type="password" name="password" onChange={this.handleChange} placeholder="Password" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="register-password2">Repeat Password</label>
                                        <input id="register-password2" value={confirmPassword} type="password" name="confirmPassword" onChange={this.handleChange} placeholder="Repeat Password" className="form-control" />
                                    </div>
                                    {errors.length > 0 && (
                                        <ul>
                                            {errors.map((err, index) => {
                                                return (
                                                    <li key={index}>
                                                        {err}
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    )}
                                    <button type="submit" className="btn btn-primary mt-4">
                                        Register
                                     </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUp;
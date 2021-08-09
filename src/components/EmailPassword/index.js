import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './styles.scss';

import { auth } from './../../firebase/utils';

const initialState = {
    email: '',
    errors: []
}

class EmailPassword extends Component {
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

        try {
            const { email } = this.state;
            const config = {
                url: 'http://localhost:3000/login'
            }

            await auth.sendPasswordResetEmail(email, config)
                .then(() => {
                    this.props.history.push('/login');
                })
                .catch(() => {
                    const err = ['Email not found. Please enter a valid email.'];
                    this.setState({
                        errors: err
                    });
                });
        } catch (err) {
            //console.log(err);
        }
    }

    render() {
        const { email, errors } = this.state;
        return (
            <div className="recovery" >
                <div className="row">
                    <div className="col-md-6 d-flex flex-column">
                        <div className="card flex-grow-1 mb-md-0">
                            <div className="card-body">
                                <h3 className="card-title"> Email Password</h3>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="login-email">Email address</label>
                                        <input id="login-email" onChange={this.handleChange} type="email" value={email} name="email" placeholder="Enter email" className="form-control" />
                                    </div>
                                    {errors.length > 0 && (
                                        <ul>
                                            {errors.map((e, index) => {
                                                return (
                                                    <li key={index}>
                                                        {e}
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    )}
                                    <button type="submit" className="btn btn-primary mt-4">
                                        Send
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

export default withRouter(EmailPassword);
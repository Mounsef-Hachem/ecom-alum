import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import './styles.scss';

import { auth } from './../../firebase/utils';

const EmailPassword = props => {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const config = {
                url: 'http://localhost:3000/login'
            }

            await auth.sendPasswordResetEmail(email, config)
                .then(() => {
                    props.history.push('/login');
                })
                .catch(() => {
                    const err = ['Email not found. Please enter a valid email.'];
                    setErrors(err);
                });
        } catch (err) {
            //console.log(err);
        }
    }

    return (
        <div className="recovery" >
            <div className="row">
                <div className="col-md-6 d-flex flex-column">
                    <div className="card flex-grow-1 mb-md-0">
                        <div className="card-body">
                            <h3 className="card-title"> Email Password</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="login-email">Email address</label>
                                    <input id="login-email" onChange={e => setEmail(e.target.value)} type="email" value={email} name="email" placeholder="Enter email" className="form-control" />
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

export default withRouter(EmailPassword);
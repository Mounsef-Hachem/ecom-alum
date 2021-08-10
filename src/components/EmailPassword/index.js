import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordStart, resetUserState } from './../../redux/User/user.actions';
import { useHistory } from 'react-router-dom';
import './styles.scss';

const mapState = ({ user }) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    userErr: user.userErr
})

const EmailPassword = props => {
    const { resetPasswordSuccess, userErr } = useSelector(mapState);
    const dispatch = useDispatch();
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (resetPasswordSuccess) {
            dispatch(resetUserState());
            history.push('/login');
        }
    }, [resetPasswordSuccess]);

    useEffect(() => {
        if (Array.isArray(userErr) && userErr.length > 0) {
            setErrors(userErr);
        }
    }, [userErr]);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(resetPasswordStart({ email }));
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

export default EmailPassword;
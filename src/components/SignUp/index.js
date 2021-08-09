import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser, resetAllAuthForms } from './../../redux/User/user.actions';
import './styles.scss';

const mapState = ({ user }) => ({
    signUpSuccess: user.signUpSuccess,
    signUpError: user.signUpError
})

const SignUp = props => {
    const { signUpSuccess, signUpError } = useSelector(mapState);
    const dispatch = useDispatch();
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (signUpSuccess) {
            resetForm();
            dispatch(resetAllAuthForms());
            props.history.push('/');
        }
    }, [signUpSuccess]);

    useEffect(() => {
        if (Array.isArray(signUpError) && signUpError.length > 0) {
            setErrors(signUpError);
        }
    }, [signUpError]);

    const resetForm = () => {
        setDisplayName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrors([]);
    }

    const handleFormSubmit = event => {
        event.preventDefault();
        dispatch(signUpUser({
            displayName,
            email,
            password,
            confirmPassword
        }));
    }

    return (
        <div className="signup">
            <div className="row">
                <div className="col-md-6 d-flex flex-column">
                    <div className="card flex-grow-1 mb-md-0">
                        <div className="card-body">
                            <h3 className="card-title"> Register</h3>
                            <form onSubmit={handleFormSubmit}>
                                <div className="form-group">
                                    <label htmlFor="login-fullname">Full Name</label>
                                    <input id="login-fullname" value={displayName} name="displayName" onChange={e => setDisplayName(e.target.value)} type="text" placeholder="Enter Full Name" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="register-email">Email address</label>
                                    <input id="register-email" value={email} type="email" name="email" onChange={e => setEmail(e.target.value)} placeholder="Enter email" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="register-password">Password</label>
                                    <input id="register-password" value={password} type="password" name="password" onChange={e => setPassword(e.target.value)} placeholder="Password" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="register-password2">Repeat Password</label>
                                    <input id="register-password2" value={confirmPassword} type="password" name="confirmPassword" onChange={e => setConfirmPassword(e.target.value)} placeholder="Repeat Password" className="form-control" />
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

export default withRouter(SignUp);
import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { emailSignInStart, googleSignInStart } from './../../redux/User/user.actions';
import './styles.scss';

const mapState = ({ user }) => ({
    currentUser: user.currentUser
})

const SignIn = props => {
    const { currentUser } = useSelector(mapState);
    const dispatch = useDispatch();
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (currentUser) {
            resetForm();
            history.push('/');
        }
    }, [currentUser])

    const resetForm = () => {
        setEmail('');
        setPassword('');
    }

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(emailSignInStart({ email, password }));
    }

    const handleGoogleSignIn = () => {
        dispatch(googleSignInStart());
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
                            <h3 className="card-title ">Don't have an account?</h3>
                            <div className="row">
                                <button onClick={handleGoogleSignIn} style={{ backgroundColor: "red" }} className="btn btn-primary mt-4 btn-block">
                                    Sign in with Google
                                </button>
                                <div className="text-center mt-4">Or</div>
                                <Link className="btn btn-primary mt-4 btn-block" to="/register">Create an account</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );


}

export default SignIn;
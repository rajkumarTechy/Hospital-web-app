import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'wc-toast';

axios.defaults.withCredentials = true;
const Login = () => {
    const navigate = useNavigate();
    

    const [values, setValues] = useState({
        username: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post('https://hospital-web-app-2j3t.vercel.app/login', values)
            .then(res => {
                if (res.data.Status === "Success") {
                    navigate('/');

                } else {
                    toast.error(res.data.Message);
                }
            })
            .catch(err => console.log(err));
    };
    

    return (
        <div className='body3'>
            <wc-toast></wc-toast>
            <div className="container">
                <form onSubmit={handleLogin}>
                    <div className="box2">
                        <div className="text">
                            <h2>User Login</h2>
                        </div>
                        <div className="username field">
                            <h4>Username</h4>
                            <input
                                type="text"
                                name='username'
                                value={values.username}
                                onChange={e => setValues({ ...values, username: e.target.value })}
                            />
                        </div>
                        <div className="password field">
                            <h4>Password</h4>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name='password'
                                value={values.password}
                                onChange={e => setValues({ ...values, password: e.target.value })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        <div className="btn">
                            <button type="submit">Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser } from '../actions/userActions';
import '../css/Login.css'

const Login = ({location , history}) => {

    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { loading , userData} = userLogin;

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(
        () => {
            if(!loading){
                if(userData) {
                    history.push(`${redirect}`)
                }
            }
        }
    , [redirect , userData])

    const handleLogin = (e) => {
        e.preventDefault();

        if(email && password)
            dispatch(loginUser({email , password}))
    }

    return (
        <>
            <section id="login">
                <p className="title">Login</p>
                <div className="msg-container">
                </div>
                <div className="email-container">
                    <label className="email-label">Email Address</label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="email address" htmlFor="email" />
                </div>
                <div className="password-container">
                    <label className="password-label">Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" value={password} placeholder="Password" htmlFor="password" />
                </div>
                <button onClick={handleLogin} className="submit">Login</button>
                <div className="new">New Customer ? <Link to='/register'> Register </Link></div>
            </section>
        </>
    )
}

export default Login

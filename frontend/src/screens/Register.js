import React, { useEffect, useState } from 'react'
import {useDispatch , useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import { createUser } from '../actions/userActions';
import '../css/register.css'

const Register = ({history , location}) => {

    const [name , setName] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [confirmPassword , setConfirmPassword] = useState('');

    const dispatch = useDispatch();

    const userRegister = useSelector(state => state.userRegister);
    const {success , loading} = userRegister;

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(
        () => {
            if(!loading){
                if(success) {
                    history.push(`${redirect}`)
                }
            }
        }
    , [redirect , success])

    const handleRegister = (e) => {
        e.preventDefault();

        if(password == confirmPassword){
            dispatch(createUser({name , email , password}))
        }

    }

    return (
        <>
            <section id="register">
                <p className="title">register</p>
                <div className="msg-container">
                </div>
                <div className="name-container">
                    <label className="name-label">name</label>
                    <input type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder="name" htmlFor="name" />
                </div>

                <div className="email-container">
                    <label className="email-label">Email Address</label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="email address" htmlFor="email" />
                </div>
                <div className="password-container">
                    <label className="password-label">Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" value={password} placeholder="Password" htmlFor="password" />
                </div>
                <div className="confirm-password-container">
                    <label className="password-label">Password</label>
                    <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" value={confirmPassword} placeholder="Password" htmlFor="password" />
                </div>
                <button onClick={handleRegister} className="submit">register</button>
                <div className="new">Already have an account ? <Link to='/login'> Login </Link> </div>
            </section>
        </>
    )
}

export default Register

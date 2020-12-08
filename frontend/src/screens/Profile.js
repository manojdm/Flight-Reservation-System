import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserOrders } from '../actions/orderActions';
import { getUserProfile, updateProfile } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';
import '../css/profile.css'

const Profile = ({history}) => {

    const dispatch = useDispatch();

    const [name , setName] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [confirmPassword , setConfirmPassword] = useState('');

    const getUser = useSelector(state => state.getUser);
    const {loading , userData} = getUser;

    const updateUser = useSelector(state => state.updateUser);
    const {success , loading:loadingUpdate} = updateUser;

    const userOrders = useSelector(state => state.userOrders);
    const {loading:loadingOrders , success:successTable , orders} = userOrders;
    
    useEffect(() => {
        if(!loadingUpdate && success){
            dispatch({type : USER_UPDATE_RESET});
        } else {
            if(!userData) {
                dispatch(getUserProfile());
                dispatch(getUserOrders());
            } else {
                    setName(userData.name)
                    setEmail(userData.email)
            }
        }
    } , [dispatch , userData , success , updateUser])


    const handleUpdate = () => {
        console.log('hello')
        if(password == confirmPassword){
            dispatch(updateProfile({email , name , password}))
        } else {
            dispatch(updateProfile({email , name}))
        }
    }


    return (
        <>
        <section id="profile">
            <div className="inside">
                <div className="user-profile">
                <p className="title">User Profile</p>
                <div className="msg-container">
                </div>
                <div className="name-container">
                    <label className="name-label">Name</label>
                    <input onChange={e => setName(e.target.value)} value={name} type="name" placeholder="Your Name" htmlFor="name" />
                </div>
                <div className="email-container">
                    <label className="email-label">Email Address</label>
                    <input onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder="email address" htmlFor="email" />
                </div>
                <div className="password-container">
                    <label className="password-label">Password</label>
                    <input onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder="Password" htmlFor="password" />
                </div>
                <div className="password-container">
                    <label className="password-label">Confirm Password</label>
                    <input onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword} type="password" placeholder="Confirm Password" htmlFor="password" />
                </div>
                <button onClick={handleUpdate} className="submit">Update</button>
                </div>
                <div className="my-orders">
                <div className="title">My Orders</div>
                <table>
                    <thead>
                    <tr>
                        <td>ID</td>
                        <td>DATE</td>
                        <td>TIME</td>
                        <td>PRICE</td>
                        <td>TOTAL PASSENGERS</td>
                        <td>PAID</td>
                        <td />
                    </tr>
                    </thead>
                    <tbody>
                        {!loadingOrders && orders.map(order => 
                            <tr>
                                <td>{order._id}</td>
                                <td>{order.isPaid ? order.createdAt.substring(0 , 10) : 'Not yet paid'}</td>
                                <td>{order.isPaid ? order.paidAt.substring(11,19) : 'Not yet paid'}</td>
                                <td>{order.totalPrice} INR</td>
                                <td>{order.passengers.length}</td>
                                <td>{order.isPaid ? <i class="fas fa-check-circle"></i> : <i class="far fa-times-circle"></i>}</td>
                                <td><button onClick={() => history.push(`/order/${order._id}`)}> Details</button></td>
                            </tr>                        
                        )
                        }
                    </tbody>
                </table>
                </div>
            </div>
        </section>
        </>
    )
}

export default Profile
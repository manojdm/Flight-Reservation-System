import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers, getUserAdmin, getUserProfile, updateUserProfile } from '../actions/userActions';
import { UPDATE_USER_RESET } from '../constants/userConstants';
import '../css/userEdit.css'

const UserEdit = ({match , history}) => {

    const id = match.params.id;

    const [name , setName] = useState('');
    const [email , setEmail] = useState('');
    const [isAdmin , setIsAdmin] = useState(true);

    const userProfile = useSelector(state => state.userProfile);
    const {loading , userData} = userProfile;

    const profileUpdate = useSelector(state => state.profileUpdate);
    const {loading:loadingUpdate , success} = profileUpdate;


    const dispatch = useDispatch();

    useEffect(
        () => {
            if(!userData || userData._id !== id)
                dispatch(getUserAdmin(id));
            else {
                setName(userData.name);
                setEmail(userData.email);
                setIsAdmin(userData.isAdmin);
            }
        }
    , [dispatch , id , userData])

    const handleUpdate = () => {
        dispatch(updateUserProfile({name , email , isAdmin , id}));
        console.log(isAdmin);
        dispatch(fetchAllUsers())
        dispatch({type : UPDATE_USER_RESET})
        history.push('/admin/users');
    }
    
    return (
            <section id="userEdit">
                <p className="title">Edit User</p>
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
                <div className="checkbox">
                    <label className="isAdmin-label">Is Admin ?</label>
                    <input type="checkbox" checked={isAdmin}  onChange={(e) => { setIsAdmin(e.target.checked)}}  />
                </div>
                <button onClick={handleUpdate} className="submit">Update</button>
            </section>
    )
}

export default UserEdit

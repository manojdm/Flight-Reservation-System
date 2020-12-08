import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllUsers, removeUser } from '../actions/userActions';
import { USER_DELETE_RESET } from '../constants/userConstants';
import '../css/allusers.css'

const AllUsers = ({history}) => {

    const dispatch = useDispatch();

    const allUsers = useSelector(state => state.allUsers);
    const {loading , users } = allUsers;

    const deleteUser = useSelector(state => state.deleteUser);
    const {success} = deleteUser;

    useEffect(
        () => {
            if(!users)
                dispatch(fetchAllUsers())
            else{
                if(success){
                    dispatch(fetchAllUsers());
                    dispatch({type : USER_DELETE_RESET})
                }
            }
        }
    , [dispatch , users , success])

    const userDeleteHandler = (id) => {
        dispatch(removeUser(id));
    }

    return (!loading && 
        <>
            <section id="all-users">
                <p className="title">All Orders</p>
                <table>
                    <thead>
                    <tr>
                        <td>ID</td>
                        <td>NAME</td>
                        <td>EMAIL</td>
                        <td>IS ADMIN ?</td>
                        <td />
                    </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? <i className="fas fa-check-circle"></i> : <i className="far fa-times-circle"></i>}</td>
                                <td className="icons"><i onClick={() => userDeleteHandler(user._id)} className="fas fa-trash"></i> <i onClick={() => history.push(`/admin/user/${user._id}`)} className="fas fa-edit"></i></td>
                            </tr>)                    
                        )
                        }
                    </tbody>
                </table>

            </section>
        </>
    )
}

export default AllUsers

import axios from 'axios'
import { USER_DELETE_DISPATCH , USER_DELETE_SUCCESS , USER_DELETE_FAIL , USER_UPDATE_DISPATCH , USER_UPDATE_SUCCESS , USER_UPDATE_FAIL, USER_PROFILE_DISPATCH , USER_PROFILE_SUCCESS , USER_PROFILE_FAIL , USER_CREATE_DISPATCH, USER_CREATE_FAIL, USER_CREATE_SUCCESS, USER_LOGIN_DISPATCH, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS, USERS_GET_DISPATCH, USERS_GET_SUCCESS, USERS_GET_FAIL, USER_ADMIN_DISPATCH, USER_ADMIN_SUCCESS, USER_ADMIN_FAIL, UPDATE_USER_DISPATCH, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL } from '../constants/userConstants';

export const createUser = (user) => async(dispatch) => {

    dispatch({type : USER_CREATE_DISPATCH , loading : true})

    try {

        const header = {headers : {'Content-Type' : 'application/json'}}
        const {data} = await axios.post('http://localhost:5000/api/users/register' , user , header);

        localStorage.setItem('userData' , JSON.stringify(data))

        dispatch({type : USER_CREATE_SUCCESS , loading : false , success : true})
        dispatch({type : USER_LOGIN_SUCCESS , loading : false , payload : data})
        
    } catch (error) {
        dispatch({type : USER_CREATE_FAIL , loading : false , success : false})
        throw new Error(error)
    }
    
}

export const loginUser = (user) => async(dispatch) => {

    dispatch({type : USER_LOGIN_DISPATCH , loading : true})

    try {

        const header = {headers : {'Content-Type' : 'application/json'}}
        const {data} = await axios.post('http://localhost:5000/api/users/login' , user , header);

        dispatch({type : USER_LOGIN_SUCCESS , loading : false , payload : data});

        data ? localStorage.setItem('userData' , JSON.stringify(data)) : console.log('Nothing');
        
    } catch (error) {
        dispatch({type : USER_LOGIN_FAIL , loading : false , payload : error , success : false})
        throw new Error(error)
    }
    
}

export const getUserProfile = () => async(dispatch , getState) => {
    dispatch({type : USER_PROFILE_DISPATCH , loading : true})

    try {

        const user = getState().userLogin.userData;

        const header = {headers : {"Authorization" : `Bearer ${user.token}`}}

        const {data} = await axios.get(`http://localhost:5000/api/users/${user._id}`, header);

        dispatch({type : USER_PROFILE_SUCCESS , loading : false , payload : data});
        
    } catch (error) {
        dispatch({type : USER_PROFILE_FAIL , loading : false , payload : error , success : false})
        throw new Error(error)
    }
}


export const updateProfile = (profile) => async (dispatch , getState) => {
    dispatch({type : USER_UPDATE_DISPATCH , loading : true})

    try {
        const user = getState().userLogin.userData;

        const header = {headers : { 'Content-Type' : 'application/json' , 'Authorization' : `Bearer ${user.token}`}}

        const {data} = await axios.put(`http://localhost:5000/api/users/${user._id}/update`,profile, header);

        dispatch({type : USER_UPDATE_SUCCESS , loading : false , payload : data , success : true});
        dispatch({type : USER_PROFILE_SUCCESS , loading : false , payload : data});
        
    } catch (error) {
        dispatch({type : USER_UPDATE_FAIL , loading : false , payload : error , success : false})
        throw new Error(error)
    }

}

export const fetchAllUsers = () => async (dispatch , getState) => {
    dispatch({type : USERS_GET_DISPATCH , loading : true})

    const userLogin = getState().userLogin;

    const {userData} = userLogin

    try {
        const header = { headers : {
            "Authorization" : `Bearer ${userData.token}`
        }}

        const {data} = await axios.get(`http://localhost:5000/api/users/` , header);

        dispatch({type : USERS_GET_SUCCESS , loading : false , payload : data})
    } catch (error) {
        dispatch({type : USERS_GET_FAIL , loading : false , payload : error})
    }
}

export const removeUser = (id) => async (dispatch , getState) => {
    dispatch({type : USER_DELETE_DISPATCH , loading : true})

    const userLogin = getState().userLogin;

    const {userData} = userLogin

    try {
        const header = { headers : {
            "Authorization" : `Bearer ${userData.token}`
        }}

        const {data} = await axios.delete(`http://localhost:5000/api/users/${id}` , header);

        dispatch({type : USER_DELETE_SUCCESS ,  success : true , loading : false , payload : data})
    } catch (error) {
        dispatch({type : USER_DELETE_FAIL , loading : false , payload : error})
    }
}

export const getUserAdmin = (id) => async(dispatch , getState) => {
    dispatch({type : USER_ADMIN_DISPATCH , loading : true})

    try {

        const user = getState().userLogin.userData;

        const header = {headers : {"Authorization" : `Bearer ${user.token}`}}

        const {data} = await axios.get(`http://localhost:5000/api/users/${id}`, header);

        dispatch({type : USER_ADMIN_SUCCESS , loading : false , payload : data});
        
    } catch (error) {
        dispatch({type : USER_ADMIN_FAIL , loading : false , payload : error , success : false})
        throw new Error(error)
    }
}

export const updateUserProfile = (profile) => async (dispatch , getState) => {
    dispatch({type : UPDATE_USER_DISPATCH , loading : true})

    const id = profile.id

    try {
        const user = getState().userLogin.userData;

        const header = {headers : { 'Content-Type' : 'application/json' , 'Authorization' : `Bearer ${user.token}`}}

        const {data} = await axios.put(`http://localhost:5000/api/users/${id}`,profile, header);

        dispatch({type : UPDATE_USER_SUCCESS , loading : false , payload : data , success : true});
        
    } catch (error) {
        dispatch({type : UPDATE_USER_FAIL , loading : false , payload : error , success : false})
        throw new Error(error)
    }

}
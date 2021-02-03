import axios from 'axios'
const { ORDER_FETCH_DISPATCH , ORDER_FETCH_FAIL , ORDER_FETCH_SUCCESS ,  SAVE_BILLING_DISPATCH, SAVE_BILLING_SUCCESS, SAVE_BILLING_FAIL, SAVE_PAYMENT_DISPATCH, SAVE_PAYMENT_SUCCESS, SAVE_PAYMENT_FAIL, ORDER_CREATE_DISPATCH, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, ORDER_PAID_DISPATCH, ORDER_PAID_SUCCESS, ORDER_PAID_FAIL, ORDER_USER_SUCCESS, ORDER_USER_DISPATCH, ORDER_USER_FAIL, GET_ORDERS_DISPATCH, GET_ORDERS_SUCCESS, GET_ORDERS_FAIL } = require("../constants/orderConstants")

export const savebilling = (data) => async(dispatch) => {
    dispatch({type : SAVE_BILLING_DISPATCH , loading : true})

    try {
        localStorage.setItem('billingaddress' , JSON.stringify(data))
        dispatch({type : SAVE_BILLING_SUCCESS , payload : data , loading : false})
    } catch (error) {
        dispatch({type : SAVE_BILLING_FAIL , payload : error.message , loading : false})
    }
}

export const savePaymentMethod = (data) => async(dispatch) => {
    dispatch({type : SAVE_PAYMENT_DISPATCH , loading : true})

    try {
        localStorage.setItem('paymentMethod' , JSON.stringify(data))
        dispatch({type : SAVE_PAYMENT_SUCCESS , payload : data , loading : false})
    } catch (error) {
        dispatch({type : SAVE_PAYMENT_FAIL , payload : error.message , loading : false})
    }
}

export const createOrder = (order) => async(dispatch , getState) => {

    dispatch({type : ORDER_CREATE_DISPATCH , loading : true})

    const userLogin = getState().userLogin;

    const {userData} = userLogin

    try {

        const header = {headers : {'Content-Type' : 'application/json' , 'Authorization' : `Bearer ${userData.token}`}}
        const {data} = await axios.post('http://localhost:5000/api/orders/create' , order , header);

        dispatch({type : ORDER_CREATE_SUCCESS , loading : false , success : true , payload : data});
        localStorage.removeItem("passengers");
        
    } catch (error) {
        dispatch({type : ORDER_CREATE_FAIL , loading : false , success : false})
        throw new Error(error)
    }
    
}

export const fetchOrder = (id) => async(dispatch , getState) => {
    dispatch({type : ORDER_FETCH_DISPATCH , loading : true});

    const userLogin = getState().userLogin;

    const {userData} = userLogin

    try {
        const header = { headers : {
            "Authorization" : `Bearer ${userData.token}`
        }}

        const {data} = await axios.get(`http://localhost:5000/api/orders/${id}` , header);

        dispatch({type : ORDER_FETCH_SUCCESS , loading : false , payload : data})
    } catch (error) {
        dispatch({type : ORDER_FETCH_FAIL , loading : false , payload : error})
    }

}

export const updatedOrderToPaid = (id , success) => async(dispatch , getState) => {
    dispatch({type : ORDER_PAID_DISPATCH , loading : true});

    const userLogin = getState().userLogin;

    const {userData} = userLogin

    try {
        const header = { headers : {
            "Authorization" : `Bearer ${userData.token}`
        }}

        const {data} = await axios.put(`http://localhost:5000/api/orders/${id}` , success , header);

        dispatch({type : ORDER_PAID_SUCCESS , loading : false , payload : data , success : true})
    } catch (error) {
        dispatch({type : ORDER_PAID_FAIL , loading : false , payload : error})
    }

}

export const getUserOrders = () => async(dispatch , getState) => {
    dispatch({type : ORDER_USER_DISPATCH , loading : true});

    const userLogin = getState().userLogin;

    const {userData} = userLogin

    try {
        const header = { headers : {
            "Authorization" : `Bearer ${userData.token}`
        }}

        const {data} = await axios.get(`http://localhost:5000/api/orders/user/` , header);

        dispatch({type : ORDER_USER_SUCCESS , loading : false , payload : data})
    } catch (error) {
        dispatch({type : ORDER_USER_FAIL , loading : false , payload : error})
    }

}

export const fetchAllOrders = () => async (dispatch , getState) => {
    dispatch({type : GET_ORDERS_DISPATCH , loading : true})

    const userLogin = getState().userLogin;

    const {userData} = userLogin

    try {
        const header = { headers : {
            "Authorization" : `Bearer ${userData.token}`
        }}

        const {data} = await axios.get(`http://localhost:5000/api/orders/` , header);

        dispatch({type : GET_ORDERS_SUCCESS , loading : false , payload : data})
    } catch (error) {
        dispatch({type : GET_ORDERS_FAIL , loading : false , payload : error})
    }
}
const { SAVE_BILLING_DISPATCH, SAVE_BILLING_FAIL, SAVE_BILLING_SUCCESS, SAVE_PAYMENT_DISPATCH, SAVE_PAYMENT_SUCCESS, SAVE_PAYMENT_FAIL, ORDER_CREATE_DISPATCH, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, ORDER_CREATE_RESET, ORDER_FETCH_DISPATCH, ORDER_FETCH_SUCCESS, ORDER_FETCH_FAIL, ORDER_FETCH_RESET, ORDER_PAID_DISPATCH, ORDER_PAID_SUCCESS, ORDER_PAID_FAIL, ORDER_PAID_RESET, ORDER_USER_DISPATCH, ORDER_USER_SUCCESS, ORDER_USER_FAIL, GET_ORDERS_DISPATCH, GET_ORDERS_SUCCESS, GET_ORDERS_FAIL } = require("../constants/orderConstants");

export const savebillingReducer = (state = {} , action) => {
    switch(action.type){
        case SAVE_BILLING_DISPATCH :
            return {loading : true}
        case SAVE_BILLING_SUCCESS :
            return {loading : false , address : action.payload}
        case SAVE_BILLING_FAIL:
            return {loading : false , error : action.payload} 
        default : 
            return state
    }
}

export const savePaymentReducer = (state = {} , action) => {
    switch(action.type){
        case SAVE_PAYMENT_DISPATCH :
            return {loading : true}
        case SAVE_PAYMENT_SUCCESS :
            return {loading : false , method : action.payload}
        case SAVE_PAYMENT_FAIL:
            return {loading : false , error : action.payload} 
        default : 
            return state
    }
}

export const orderCreateReducer = (state = {} , action) => {
    switch(action.type){
        case ORDER_CREATE_DISPATCH:
            return {loading : true}
        case ORDER_CREATE_SUCCESS:
            return {loading : false , success : true , order : action.payload }
        case ORDER_CREATE_FAIL:
            return {loading : false , error : action.payload}
        case ORDER_CREATE_RESET : 
            return {loading : false , success : false}
        default :
            return state
    }
}

export const fetchOrderReducer = (state = {loading : true} , action) => {
    switch(action.type){
    case ORDER_FETCH_DISPATCH:
        return {loading : true}
    case ORDER_FETCH_SUCCESS:
        return {loading : false , order : action.payload }
    case ORDER_FETCH_FAIL:
        return {loading : false , error : action.payload}
    case ORDER_FETCH_RESET : 
        return {loading : false }
    default :
        return state
    }
}

export const paidOrderReducer = (state = {loading : true} , action) => {
    switch(action.type){
    case ORDER_PAID_DISPATCH:
        return {loading : true}
    case ORDER_PAID_SUCCESS:
        return {loading : false , order : action.payload , success : true}
    case ORDER_PAID_FAIL:
        return {loading : false , error : action.payload}
    case ORDER_PAID_RESET : 
        return {}
    default :
        return state
    }
}


export const userOrdersReducers = (state = {loading : true} , action) => {
    switch(action.type){
    case ORDER_USER_DISPATCH:
        return {loading : true}
    case ORDER_USER_SUCCESS:
        return {loading : false , orders : action.payload , success : true}
    case ORDER_USER_FAIL:
        return {loading : false , error : action.payload}
    default :
        return state
    }
}

export const usersOrdersReducers = (state = {loading : true} , action) => {
    switch(action.type){
    case GET_ORDERS_DISPATCH:
        return {loading : true}
    case GET_ORDERS_SUCCESS:
        return {loading : false , orders : action.payload , success : true}
    case GET_ORDERS_FAIL:
        return {loading : false , error : action.payload}
    default :
        return state
    }
}

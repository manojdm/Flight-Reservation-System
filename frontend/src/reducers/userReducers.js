const { USER_CREATE_DISPATCH, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_CREATE_SUCCESS, USER_CREATE_FAIL, USER_LOGIN_DISPATCH, USER_LOGIN_RESET, USER_PROFILE_DISPATCH, USER_PROFILE_SUCCESS, USER_PROFILE_FAIL, USER_UPDATE_DISPATCH, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_RESET, USERS_GET_DISPATCH, USERS_GET_SUCCESS, USERS_GET_FAIL, USER_DELETE_DISPATCH, USER_DELETE_SUCCESS, USER_DELETE_FAIL, USER_DELETE_RESET, USER_ADMIN_DISPATCH, USER_ADMIN_SUCCESS, USER_ADMIN_FAIL, UPDATE_USER_DISPATCH, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL, UPDATE_USER_RESET } = require("../constants/userConstants");

export const userLoginReducer = (state = {} , action) => {
    switch(action.type){
        case USER_LOGIN_DISPATCH:
            return {loading : true}
        case USER_LOGIN_SUCCESS:
            return {loading : false , userData : action.payload}
        case USER_LOGIN_FAIL:
            return {loading : false , error : action.payload}
        case USER_LOGIN_RESET :
            return {}
        default :
            return state
    }
}

export const userCreateReducer = (state = {} , action) => {
    switch(action.type){
        case USER_CREATE_DISPATCH:
            return {loading : true}
        case USER_CREATE_SUCCESS:
            return {loading : false , success : true}
        case USER_CREATE_FAIL:
            return {loading : false , error : action.payload}
        default :
            return state
    }
}

export const getUserProfileReducer = (state = {} , action) => {
    switch(action.type){
        case USER_PROFILE_DISPATCH:
            return {loading : true}
        case USER_PROFILE_SUCCESS:
            return {loading : false , userData : action.payload}
        case USER_PROFILE_FAIL:
            return {loading : false , error : action.payload}
        default : 
            return state
    }
}

export const userUpdateReducer = (state = {} , action) => {
    switch(action.type){
        case USER_UPDATE_DISPATCH:
            return {loading : true}
        case USER_UPDATE_SUCCESS:
            return {loading : false , success : true}
        case USER_UPDATE_FAIL:
            return {loading : false , error : action.payload}
        case USER_UPDATE_RESET :
            return {}
        default :
            return state
    }
}

export const allUsersReducers = (state = {loading : true} , action) => {
    switch(action.type){
    case USERS_GET_DISPATCH:
        return {loading : true}
    case USERS_GET_SUCCESS:
        return {loading : false , users : action.payload , success : true}
    case USERS_GET_FAIL:
        return {loading : false , error : action.payload}
    default :
        return state
    }
}

export const deleteUserReducers = (state = {loading : true} , action) => {
    switch(action.type){
    case USER_DELETE_DISPATCH:
        return {loading : true}
    case USER_DELETE_SUCCESS:
        return {loading : false , users : action.payload , success : true}
    case USER_DELETE_RESET :
        return {}
    case USER_DELETE_FAIL:
        return {loading : false , error : action.payload}
    default :
        return state
    }
}

export const getUserAdminReducer = (state = {} , action) => {
    switch(action.type){
        case USER_ADMIN_DISPATCH:
            return {loading : true}
        case USER_ADMIN_SUCCESS:
            return {loading : false , userData : action.payload}
        case USER_ADMIN_FAIL:
            return {loading : false , error : action.payload}
        default : 
            return state
    }
}

export const updateUserReducer = (state = {} , action) => {
    switch(action.type){
        case UPDATE_USER_DISPATCH:
            return {loading : true}
        case UPDATE_USER_SUCCESS:
            return {loading : false , success : true}
        case UPDATE_USER_FAIL:
            return {loading : false , error : action.payload}
        case UPDATE_USER_RESET :
            return {}
        default :
            return state
    }
}
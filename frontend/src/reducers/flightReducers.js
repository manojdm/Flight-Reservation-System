import {LOAD_FLIGHTS_FAIL , LOAD_FLIGHTS_SUCCESS , LOAD_FLIGHTS_REQUEST, LOAD_FLIGHT_REQUEST, LOAD_FLIGHT_SUCCESS, LOAD_FLIGHT_FAIL, SAVE_SEATS_DISPATCH, SAVE_SEATS_SUCCESS, SAVE_SEATS_FAIL, FLIGHT_UPDATE_DISPATCH, FLIGHT_UPDATE_SUCCESS, FLIGHT_UPDATE_FAIL, FLIGHT_UPDATE_RESET, FLIGHT_DELETE_DISPATCH, FLIGHT_DELETE_SUCCESS, FLIGHT_DELETE_FAIL, FLIGHT_DELETE_RESET, FLIGHT_ADD_DISPATCH, FLIGHT_ADD_SUCCESS, FLIGHT_ADD_FAIL, FLIGHT_ADD_RESET} from '../constants/flightConstants'

export const getFlightsReducers = (state = {loading : true} , action) => {
    switch(action.type){
        case LOAD_FLIGHTS_REQUEST : 
            return {loading : true}
        case LOAD_FLIGHTS_SUCCESS :
            return {loading : false , flights : action.payload}
        case LOAD_FLIGHTS_FAIL :
            return {loading : false , error : action.payload}
        default :
            return state
    }
}

export const getFlightReducers = (state = {loading : true} , action) => {
    switch(action.type){
        case LOAD_FLIGHT_REQUEST : 
            return {loading : true}
        case LOAD_FLIGHT_SUCCESS :
            return {loading : false , flight : action.payload}
        case LOAD_FLIGHT_FAIL :
            return {loading : false , error : action.payload}
        default :
            return state
    }
}

export const passengersDetails = (state = { passengers : [] } , action) => {
    switch(action.type){
        case SAVE_SEATS_DISPATCH :
            return {loading : true}
        case SAVE_SEATS_SUCCESS :
            return {loading : false , passengers : action.payload}
        case SAVE_SEATS_FAIL : 
            return {loading : false , error : action.payload}
        default : 
            return state
    }
}

export const updateFlightReducer = (state = {loading : true} , action) => {
    switch(action.type){
        case FLIGHT_UPDATE_DISPATCH :
            return {loading : true}
        case FLIGHT_UPDATE_SUCCESS :
            return {loading : false , success : true}
        case FLIGHT_UPDATE_FAIL :
            return {loading : false }
        case FLIGHT_UPDATE_RESET :
            return {}
        default :
            return state 
    }
}

export const deleteFlightReducer = (state = {loading : true} , action) => {
    switch(action.type){
        case FLIGHT_DELETE_DISPATCH :
            return {loading : true}
        case FLIGHT_DELETE_SUCCESS :
            return {loading : false , success : true}
        case FLIGHT_DELETE_FAIL :
            return {loading : false }
        case FLIGHT_DELETE_RESET :
            return {}
        default :
            return state 
    }
}

export const addFlightReducer = (state = {loading : true} , action) => {
    switch(action.type){
        case FLIGHT_ADD_DISPATCH :
            return {loading : true}
        case FLIGHT_ADD_SUCCESS :
            return {loading : false , success : true}
        case FLIGHT_ADD_FAIL :
            return {loading : false }
        case FLIGHT_ADD_RESET :
            return {}
        default :
            return state 
    }
}
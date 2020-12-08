import axios from 'axios'
import { FLIGHT_UPDATE_DISPATCH, FLIGHT_UPDATE_SUCCESS , FLIGHT_UPDATE_FAIL , LOAD_FLIGHTS_FAIL, LOAD_FLIGHTS_REQUEST, LOAD_FLIGHTS_SUCCESS, LOAD_FLIGHT_FAIL, LOAD_FLIGHT_REQUEST, LOAD_FLIGHT_SUCCESS, SAVE_SEATS_DISPATCH, SAVE_SEATS_FAIL, SAVE_SEATS_SUCCESS, FLIGHT_DELETE_DISPATCH, FLIGHT_DELETE_SUCCESS, FLIGHT_DELETE_FAIL, FLIGHT_ADD_DISPATCH, FLIGHT_ADD_SUCCESS, FLIGHT_ADD_FAIL } from '../constants/flightConstants'

export const loadFlights = () => async (dispatch) => {
    dispatch ({type : LOAD_FLIGHTS_REQUEST , loading : true})

    try {
        const {data} = await axios.get(`http://localhost:5000/api/flights/`)
        dispatch ({type : LOAD_FLIGHTS_SUCCESS , payload : data , loading : false})
    } catch (error) {
        dispatch({
            type : LOAD_FLIGHTS_FAIL,
            payload : error.message ? error.message : error
        })
    }
} 

export const loadFlight = (id) => async (dispatch) => {
    dispatch ({type : LOAD_FLIGHT_REQUEST , loading : true})

    try {
        const {data} = await axios.get(`http://localhost:5000/api/flights/${id}`)
        dispatch ({type : LOAD_FLIGHT_SUCCESS , payload : data , loading : false})
    } catch (error) {
        dispatch({
            type : LOAD_FLIGHT_FAIL,
            payload : error.message ? error.message : error
        })
    }
}

export const savePassengersDetails = (data) => async (dispatch) => {
        dispatch ({type : SAVE_SEATS_DISPATCH , loading: true})

    try {
        let items = [];

        items = localStorage.getItem('passengers') ? JSON.parse(localStorage.getItem('passengers')): [];
        items.push(data);

        console.log(JSON.parse(localStorage.getItem('passengers')))
        localStorage.setItem('passengers' ,JSON.stringify(items))

        console.log(items)

        dispatch ({type : SAVE_SEATS_SUCCESS , payload : items , loading : false})
    } catch(error) {
        dispatch({
            type : SAVE_SEATS_FAIL,
            payload : error.message ? error.message : error
        })
    }
}

export const deletePassengerDetails = (seatId) => async (dispatch) => {
        dispatch ({type : SAVE_SEATS_DISPATCH , loading: true})

    try {
        let items = [];

        items = localStorage.getItem('passengers') ? JSON.parse(localStorage.getItem('passengers')): [];
        items = items.filter(item => item.seat != seatId);

        console.log(items);
        localStorage.setItem('passengers' ,JSON.stringify(items))

        dispatch ({type : SAVE_SEATS_SUCCESS , payload : items , loading : false})
    } catch(error) {
        dispatch({
            type : SAVE_SEATS_FAIL,
            payload : error.message ? error.message : error
        })
    }
}

export const updateFlight = (flight) => async (dispatch , getState) => {
    dispatch ({type : FLIGHT_UPDATE_DISPATCH , loading: true})

    try {

        const user = getState().userLogin.userData;

        const header = {headers : {'Content-Type' : 'application/json' , 'Authorization' : `Bearer ${user.token}`}};
        
        const {data} = await axios.put(`http://localhost:5000/api/flights/${flight.id}` , flight , header)

        dispatch ({type : FLIGHT_UPDATE_SUCCESS , success : true , loading : false})
    } catch(error) {
        dispatch({
            type : FLIGHT_UPDATE_FAIL,
            payload : error.message ? error.message : error
        })
    }   
}

export const deleteFlight = (id) => async (dispatch , getState) => {
    dispatch ({type : FLIGHT_DELETE_DISPATCH , loading: true})

    try {

        const user = getState().userLogin.userData;

        const header = {headers : {'Content-Type' : 'application/json' , 'Authorization' : `Bearer ${user.token}`}};

        const {data} = await axios.delete(`http://localhost:5000/api/flights/${id}` , header)

        dispatch ({type : FLIGHT_DELETE_SUCCESS , success : true , loading : false})
    } catch(error) {
        dispatch({
            type : FLIGHT_DELETE_FAIL,
            payload : error.message ? error.message : error
        })
    }   
}

export const addFlight = (flight) => async (dispatch , getState) => {
    dispatch ({type : FLIGHT_ADD_DISPATCH , loading: true})

    try {

        const user = getState().userLogin.userData;

        const header = {headers : {'Authorization' : `Bearer ${user.token}`}};

        const {data} = await axios.post(`http://localhost:5000/api/flights/` , flight , header)

        dispatch ({type : FLIGHT_ADD_SUCCESS , success : true , payload : data , loading : false})
    } catch(error) {
        dispatch({
            type : FLIGHT_ADD_FAIL,
            payload : error.message ? error.message : error
        })
    }   
}
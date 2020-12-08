import { combineReducers } from "redux"
import { addFlightReducer , deleteFlightReducer , getFlightReducers, getFlightsReducers, passengersDetails, updateFlightReducer } from "./flightReducers"
import { fetchOrderReducer, orderCreateReducer, paidOrderReducer, savebillingReducer, savePaymentReducer, userOrdersReducers, usersOrdersReducers } from "./orderReducers"
import {userLoginReducer , userCreateReducer, getUserProfileReducer, userUpdateReducer, allUsersReducers, deleteUserReducers, getUserAdminReducer, updateUserReducer} from './userReducers'

const reducers = combineReducers({
    getFlights : getFlightsReducers,
    getFlight : getFlightReducers,
    passengers : passengersDetails,
    userLogin : userLoginReducer,
    userRegister : userCreateReducer,
    billingAddress : savebillingReducer,
    paymentMethod : savePaymentReducer,
    createdOrder : orderCreateReducer,  
    fetchOrder : fetchOrderReducer,
    updatedOrder : paidOrderReducer,
    getUser : getUserProfileReducer,
    updateUser : userUpdateReducer,
    userOrders : userOrdersReducers,
    allOrders : usersOrdersReducers,  
    allUsers : allUsersReducers,
    deleteUser :deleteUserReducers,
    userProfile : getUserAdminReducer,
    profileUpdate : updateUserReducer,
    updateFlight : updateFlightReducer,
    deleteFlight : deleteFlightReducer,
    addFlight : addFlightReducer,
})

export default reducers
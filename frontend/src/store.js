import thunk from 'redux-thunk'
import {applyMiddleware , compose , createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import reducers from './reducers'

const middleware = [thunk];

const passengers = { passengers : localStorage.getItem('passengers') ? JSON.parse(localStorage.getItem('passengers')) : [] , loading : false }
const userLogin = { userData : localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : undefined , loading : false }
const billingAddress = { address : localStorage.getItem('billingaddress') ? JSON.parse(localStorage.getItem('billingaddress')) : undefined , loading : false }
const paymentMethod = { method : localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : undefined , loading : false }

const initalState = {
    passengers,
    userLogin,
    billingAddress,
    paymentMethod,
}

const store = createStore(reducers , initalState , compose(composeWithDevTools(applyMiddleware(...middleware))));

export default store
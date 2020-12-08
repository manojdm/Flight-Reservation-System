import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {savebilling} from '../actions/orderActions'
import '../css/billingaddress.css'
import Steps from '../Components/Steps'


const BillingAddress = ({history}) => {

    const [address , setAddress] = useState('');
    const [city , setCity] = useState('');
    const [postalCode , setPostalCode] = useState('');
    const [country , setCountry] = useState('');

    const billingAddress = useSelector(state => state.billingAddress);
    const {loading , address : savedAddress} = billingAddress;

    const dispatch = useDispatch();

    useEffect(() => {
        if(!loading && savedAddress){
            setAddress(savedAddress.address)
            setCity(savedAddress.city)
            setPostalCode(savedAddress.postalCode)
            setCountry(savedAddress.country)
        }
    } , [savedAddress , loading])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(savebilling({address , city , postalCode , country}));

        history.push('/payment')
    }

    return (
        <>
            <Steps step1 step2 />
            <section id="billing">
            <p className="title">billing</p>
            <div className="msg-container">
            </div>
            <div className="email-container">
                <label className="address-label">Address</label>
                <input type="text" onChange={(e) => setAddress(e.target.value)} value={address} placeholder="address" htmlFor="address" />
            </div>
            <div className="city-container">
                <label className="city-label">City</label>
                <input type="text" onChange={(e) => setCity(e.target.value)} value={city} placeholder="City" htmlFor="password" />
            </div>
            <div className="postal-container">
                <label className="postal-label">Postal Code</label>
                <input type="number" placeholder="Postal Code" onChange={(e) => setPostalCode(e.target.value)} value={postalCode} htmlFor="postal code" />
            </div>
            <div className="country-container">
                <label className="country-label">Country</label>
                <input type="text" placeholder="Country" onChange={(e) => setCountry(e.target.value)} value={country} htmlFor="country" />
            </div>
            <button onClick={handleSubmit} className="submit">Continue</button>
            </section>
        </>
    )
}

export default BillingAddress

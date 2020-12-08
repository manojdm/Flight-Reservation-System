import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { savePaymentMethod } from '../actions/orderActions';
import Steps from '../Components/Steps'
import '../css/paymentmethod.css'

const PaymentMethod = ({history}) => {

    const [paymentMethod , setPaymentMethod] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = () => {

        dispatch(savePaymentMethod({paymentMethod}));
        history.push(`/placeorder`)

    }


    return (
        <>
            <Steps step1 step2 step3 />
            <section id="payment-method">
                <div className="container">
                    <p className="title">Payment Method</p>
                    <div className="msg-container">
                    </div>
                    <label htmlFor="paymentmethod">Select Method</label>
                    <br />
                    <input type="radio" id="method" name="payment-method" onChange={(e) => setPaymentMethod(e.target.value)} value="paypal" />
                    <label htmlFor="method">Paypal/ Card</label>
                    <button onClick={handleSubmit} className="submit">Continue</button>
                </div>
            </section>
        </>
    )
}

export default PaymentMethod

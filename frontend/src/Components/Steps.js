import React from 'react'
import '../css/steps.css'

const Steps = ({step1, step2 , step3 , step4}) => {

    return (
    <section id="navigate">
        <a href="#">
            <button className="nav" disabled={!step1}>Login</button>
        </a>
        <a href="#">
            <button className="nav" disabled={!step2}>Billing Address</button>
        </a>
        <a href="#">
            <button className="nav" disabled={!step3}>Payment Method</button>
        </a>
        <a href="#">
            <button className="nav" disabled={!step4}>Order</button>
        </a>
    </section>
    )
}

export default Steps

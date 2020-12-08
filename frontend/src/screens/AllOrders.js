import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrders } from '../actions/orderActions';
import '../css/allorders.css'

const AllOrders = ({history}) => {

    const dispatch = useDispatch();

    const allOrders = useSelector(state => state.allOrders);
    const {loading , orders} = allOrders

    useEffect(
        () => {
            if(!orders){
                dispatch(fetchAllOrders())
            }
        }
    , [dispatch , orders])

    return (
        !loading && 
        <>
            <section id="all-orders">
                <p className="title">All Orders</p>
                <table>
                    <thead>
                    <tr>
                        <td>ID</td>
                        <td>DATE</td>
                        <td>TIME</td>
                        <td>PRICE</td>
                        <td>TOTAL PASSENGERS</td>
                        <td>PAID</td>
                        <td />
                    </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => 
                            <tr>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0 , 10)}</td>
                                <td>{order.paidAt.substring(11,19)}</td>
                                <td>{order.totalPrice} INR</td>
                                <td>{order.passengers.length}</td>
                                <td>{order.isPaid ? <i class="fas fa-check-circle"></i> : <i class="far fa-times-circle"></i>}</td>
                                <td><button onClick={() => history.push(`/order/${order._id}`)}> Details</button></td>
                            </tr>                        
                        )
                        }
                    </tbody>
                </table>
            </section>
        </>
    )
}

export default AllOrders

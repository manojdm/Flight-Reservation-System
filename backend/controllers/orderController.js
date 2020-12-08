import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose'
import Order from '../models/orderModel.js'
import Flight from '../models/flightModel.js'

export const createNewOrder= asyncHandler(async(req , res) => {

    const {user , passengers , flight ,  billingAddress , paymentMethod , taxPrice , totalPassengers , totalPrice } = req.body;

    const order = await Order.create({
        user ,
        flight,
        passengers,
        billingAddress ,
        paymentMethod ,
        taxPrice ,
        totalPassengers ,
        totalPrice
    })

    res.json(order);

})


export const fetchOrderById = asyncHandler( async (req , res) => {
    const id = req.params.id;

    const order = await Order.findById(id).populate('flight');

    if(order) {
        res.json(order);
    } else {
        res.status(404).json({"message" : "order not found"})
    }
})


export const updateOrderToPaid = asyncHandler(async (req , res) => {
    const id = req.params.id

    const {create_time , payer , status} = req.body

    const order = await Order.findById(id);

    if(order) {
        
        order.paymentResult.id = req.body.id;
        order.paymentResult.status = status
        order.paymentResult.update_time = req.update_time;
        order.paymentResult.email_address = payer.email_address;

        order.isPaid = true;
        order.paidAt = create_time;

        const updatedOrder = await order.save()
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Not found')
    }

})


export const getOrdersByUser = asyncHandler(async (req , res) => {
    const userId = req.user._id;

    const orders = await Order.find({user : userId});

    res.json(orders);
})

export const fetchAllOrders = asyncHandler(async (req , res) => {
    const orders = await Order.find({});
    res.json(orders);
})


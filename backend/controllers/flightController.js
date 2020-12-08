import asyncHandler from 'express-async-handler'
import express from 'express'
import mongoose from 'mongoose'
import Flight from '../models/flightModel.js'

export const addNewFlight = asyncHandler(async(req , res) => {
    const {name , number , from , to , fromDate , toDate , fromTime , toTime , duration , stops , price} = req.body;

    try {
        const flight = await Flight.create({
            name,
            number,
            from,
            to,
            fromDate : new Date(fromDate),
            toDate : new Date(toDate),
            fromTime,
            toTime,
            duration,
            price
        })

        res.json(flight);
        
    } catch (error){
        res.status(500)
        throw new Error(error);
    }

})

export const getFlights = asyncHandler(async(req, res) => {
    
try {
    const flights = await Flight.find({})
    res.json(flights);
} catch (error){
    res.status(500)
    throw new Error();
}

});

export const getFlight = asyncHandler(async(req, res) => {

    const id = req.params.id
    
    try {
        const flights = await Flight.findById(id)
        res.json(flights);
    } catch (error){
        res.status(500)
        throw new Error();
    }
});


export const updateFlight = asyncHandler(async(req , res) => {

    const id = req.params.id;

    const flight = await Flight.findById(id);

    const {name , number , from , to , fromDate , toDate , fromTime , toTime , duration , price} = req.body;

    try {
        const flightUpdated = await Flight.findByIdAndUpdate( id , {
            name,
            number,
            from,
            to,
            fromDate : new Date(fromDate),
            toDate : new Date(toDate),
            fromTime,
            toTime,
            duration,
            price
        })

        res.json(flightUpdated);
    } catch (error){
        res.status(500)
        throw new Error(error);
    }

})

export const deleteFlight = asyncHandler(async(req , res) => {

    const id = req.params.id;

    const flight = await Flight.findById(id);

    if(flight) {
        const flightUpdated = await Flight.findByIdAndRemove(id);
        res.json(flightUpdated);
    } else {
        res.status(500)
        throw new Error(error);
    }

})
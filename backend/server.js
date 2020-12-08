import express from 'express'
import mongoose from 'mongoose'
import connectDB from './utils/connectdb.js'
import errorHandler from './utils/errorHandling.js'
import flights from './routes/flights.js'
import cors from 'cors'
import users from './routes/users.js'
import orders from './routes/orders.js'

const app = express()

//CONNECT TO DB
connectDB();


//Cors policies
app.use(cors())

//body parser
app.use(express.json());
app.use(express.urlencoded({extended : true}));

//USE ROUTES
app.use( '/api/flights',flights)
app.use('/api/users' , users )
app.use('/api/orders' , orders)
app.get('/api/paypal' , (req ,res) => {
    res.send('AVl3Wy5AUkVw8upxs-KBnOuo5M5CU8tz1tHBOt3kxYBr_FBs-JGbkWaRRO6BTEfCHn6BWWHsCYZ9DN-H');
})


//error handling
app.use(errorHandler)


//run server
app.listen(5000);
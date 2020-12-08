import { time } from 'console'
import mongoose  from 'mongoose'

const reviewSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    rating : {
        type : String,
        required : true
    },
    comment : {
        type : String,
        required : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
},
   
    {
        timestamps : true
    })

const flightSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        // required : true,
        ref : 'User'
    },
    name : {
        type : String,
        required : true
    },
    number : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true,
    },
    from : {
        type : String,
        required : true
    },
    to : {
        type : String,
        required : true
    },
    fromTime : {
        type : String,
        required : true
    },
    toTime : {
        type : String,
        required : true
    },
    fromDate : {
        type : Date,
        required : true
    },
    toDate : {
        type : Date,
        required : true
    },
    duration : {
        type : String,
        required : true
    },
    seats : [],
    stops : {
        type : Number,
        required : true,
        default : 0
    },
    reviews : [reviewSchema]
} , 
    {
        timestamps : true
    }
)

const Flight = mongoose.model('Flight' , flightSchema);

export default Flight

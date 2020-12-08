import mongoose from 'mongoose';

const passengerSchema = mongoose.Schema({
  name : String,
  age : Number,
  seat : String,
  user : {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
  },
  flight : {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Flight',
  }
})

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    flight: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Flight',
    },
    passengers: 
      [passengerSchema],
    billingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPassengers: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model('Order', orderSchema)

export default Order
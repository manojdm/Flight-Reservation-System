import {createNewOrder, fetchAllOrders, fetchOrderById, getOrdersByUser, updateOrderToPaid} from '../controllers/orderController.js';
import {admin, protect} from '../utils/middleware.js'
import express from 'express';
const router = express.Router()

router.post('/create' , createNewOrder);
router.get('/user' , protect , getOrdersByUser);
router.get('/' , protect , admin , fetchAllOrders)
router.get('/:id' , protect , fetchOrderById);
router.put('/:id' , protect ,  updateOrderToPaid);

export default router
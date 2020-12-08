import { createUser ,authLogin, getUser, updateUser  , fetchAllUsers, deleteUser, updateUserProfile} from '../controllers/UserController.js'
import express from 'express'
import { admin, protect } from '../utils/middleware.js';
const router = express.Router();

router.post('/login' , authLogin);
router.post('/register' , createUser);
router.get('/' , protect , admin , fetchAllUsers )
router.get('/:id' , protect , getUser );
router.put('/:id/update' , protect , updateUser);
router.put('/:id' , protect , admin , updateUserProfile);
router.delete('/:id' , protect , admin , deleteUser);

export default router
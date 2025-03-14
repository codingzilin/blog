import express from 'express';
import { test } from '../controllers/user.controller.js';
import { updateUser, getUsers, deleteUser, signout } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test);
router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/signout', verifyToken, signout);
router.get('/getusers', verifyToken, getUsers);

export default router;
import express from 'express';
import {
	getUsers,
	postUser,
	getUser,
	updateUser,
	deleteUser,
	loginUser,
} from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/', postUser);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/login', loginUser);

export default router;

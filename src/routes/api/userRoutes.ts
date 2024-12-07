import { Router } from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../../controllers/userController.js';

const router = Router();

// GET all users
router.get('/', getAllUsers);

// GET a single user by ID
router.get('/:id', getUserById);

// POST a new user
router.post('/', createUser);

// PUT to update a user by ID
router.put('/:id', updateUser);

// DELETE a user by ID
router.delete('/:id', deleteUser);

export { router as userRouter };
import { Router } from 'express';
import { userRouter } from './api/userRoutes.js';
import { thoughtRouter } from './api/thoughtRoutes.js';

const router = Router();

// Root route
router.get('/', (_req, res) => {
  res.send('Welcome to the Social Network API!');
});

// Use user routes
router.use('/users', userRouter);

// Use thought routes
router.use('/thoughts', thoughtRouter);

export default router;
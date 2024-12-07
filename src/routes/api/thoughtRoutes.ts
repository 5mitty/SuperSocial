import { Router } from 'express';
import { getAllThoughts, getThoughtById, createThought, updateThought, deleteThought, createReaction, deleteReaction } from '../../controllers/thoughtController.js';

const router = Router();

// GET all thoughts
router.get('/', getAllThoughts);

// GET a single thought by ID
router.get('/:id', getThoughtById);

// POST a new thought
router.post('/', createThought);

// PUT to update a thought by ID
router.put('/:id', updateThought);

// DELETE a thought by ID
router.delete('/:id', deleteThought);

// POST to create a reaction stored in a single thought's reactions array
router.post('/:thoughtId/reactions', createReaction);

// DELETE to pull and remove a reaction by the reaction's reactionId value
router.delete('/:thoughtId/reactions/:reactionId', deleteReaction);

export { router as thoughtRouter };
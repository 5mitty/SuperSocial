import { Request, Response } from 'express';
import { modelThoughtRouter, Reaction } from '../models/Thought.js';
import { modelUserRouter } from '../models/User.js'; // Ensure you import the User model

// Get all thoughts
export const getAllThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await modelThoughtRouter.find().populate('reactions');
        res.status(200).json(thoughts);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving thoughts', error });
    }
};

// Get a single thought by ID
export const getThoughtById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const thought = await modelThoughtRouter.findById(req.params.id).populate('reactions');
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        return res.status(200).json(thought);
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving thought', error });
    }
};

// Create a new thought
export const createThought = async (req: Request, res: Response) => {
    try {
        const newThought = new modelThoughtRouter({
            thoughtText: req.body.thoughtText,
            username: req.body.username,
        });
        const savedThought = await newThought.save();

        // Push the created thought's _id to the associated user's thoughts array
        await modelUserRouter.findByIdAndUpdate(req.body.userId, { $push: { thoughts: savedThought._id } });

        res.status(201).json(savedThought);
    } catch (error) {
        res.status(400).json({ message: 'Error creating thought', error });
    }
};

// Update a thought by ID
export const updateThought = async (req: Request, res: Response): Promise<Response> => {
    try {
        const updatedThought = await modelThoughtRouter.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedThought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        return res.status(200).json(updatedThought);
    } catch (error) {
        return res.status(400).json({ message: 'Error updating thought', error });
    }
};

// Delete a thought by ID
export const deleteThought = async (req: Request, res: Response): Promise<Response> => {
    try {
        const deletedThought = await modelThoughtRouter.findByIdAndDelete(req.params.id);
        if (!deletedThought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        return res.status(200).json({ message: 'Thought deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting thought', error });
    }
};

export const createReaction = async (req: Request, res: Response): Promise<Response> => {
    try {
        const thought = await modelThoughtRouter.findById(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }

        // Create a new reaction document using the Reaction model
        const newReaction = new Reaction({
            reactionBody: req.body.reactionBody,
            username: req.body.username,
        });

        // Push the new reaction to the thought's reactions array
        thought.reactions.push(newReaction);
        await thought.save();

        return res.status(201).json(thought); // Return the updated thought
    } catch (error) {
        return res.status(400).json({ message: 'Error creating reaction', error });
    }
};

// Delete a reaction by the reaction's reactionId value
export const deleteReaction = async (req: Request, res: Response): Promise<Response> => {
    try {
        const thought = await modelThoughtRouter.findById(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }

        // Check if the reaction exists before trying to delete it
        const reactionExists = thought.reactions.some((reaction) => 
            reaction.reactionId.toString() === req.params.reactionId
        );
        if (!reactionExists) {
            return res.status(404).json({ message: 'Reaction not found' });
        }

        // Remove the reaction from the thought's reactions array
        thought.reactions = thought.reactions.filter((reaction) => 
            reaction.reactionId.toString() !== req.params.reactionId
        );
        await thought.save();

        return res.status(200).json({ message: 'Reaction deleted successfully' }); // Ensure this return statement is present
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting reaction', error });
    }
};
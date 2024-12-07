import { Request, Response } from 'express';
import { modelUserRouter } from '../models/User.js';

// Create a new user
export const createUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const user = await modelUserRouter.create(req.body);
        return res.status(201).json(user);
    } catch (err: unknown) {
        if (err instanceof Error) {
            return res.status(400).json({ message: err.message });
        }
        return res.status(400).json({ message: 'An unknown error occurred' });
    }
};

// Get all users
export const getAllUsers = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const users = await modelUserRouter.find().populate('thoughts').populate('friends');
        // Map users to include formatted timestamps
        const formattedUsers = users.map(user => ({
            username: user.username,
            email: user.email,
            thoughts: user.thoughts,
            friends: user.friends,
            createdAt: user.formattedCreatedAt, // Use formatted timestamp
            updatedAt: user.formattedUpdatedAt, // Use formatted timestamp
            friendCount: user.friendCount, // Include friend count
        }));
        return res.status(200).json(formattedUsers);
    } catch (err: unknown) {
        if (err instanceof Error) {
            return res.status(500).json({ message: err.message });
        }
        return res.status(500).json({ message: 'An unknown error occurred' });
    }
};

// Get a user by ID
export const getUserById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const user = await modelUserRouter.findById(req.params.id).populate('thoughts').populate('friends');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Return user with formatted timestamps
        return res.status(200).json({
            username: user.username,
            email: user.email,
            thoughts: user.thoughts,
            friends: user.friends,
            createdAt: user.formattedCreatedAt, // Use formatted timestamp
            updatedAt: user.formattedUpdatedAt, // Use formatted timestamp
            friendCount: user.friendCount, // Include friend count
        });
    } catch (err: unknown) {
        if (err instanceof Error) {
            return res.status(500).json({ message: err.message });
        }
        return res.status(500).json({ message: 'An unknown error occurred' });
    }
};

// Update a user by ID
export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const user = await modelUserRouter.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (err: unknown) {
        if (err instanceof Error) {
            return res.status(400).json({ message: err.message });
        }
        return res.status(400).json({ message: 'An unknown error occurred' });
    }
};

// Delete a user by ID
export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const user = await modelUserRouter.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(204).send(); // No content to send back
    } catch (err: unknown) {
        if (err instanceof Error) {
            return res.status(500).json({ message: err.message });
        }
        return res.status(500).json({ message: 'An unknown error occurred' });
    }
};
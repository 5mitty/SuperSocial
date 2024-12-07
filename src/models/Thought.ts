import mongoose, { Schema, Document } from 'mongoose';

// Define the Reaction interface
interface IReaction extends Document {
    reactionId: mongoose.Types.ObjectId;
    reactionBody: string;
    username: string;
}

// Define the Thought interface
interface IThought extends Document {
    thoughtText: string;
    username: string;
    reactions: IReaction[]; // Use the IReaction interface for the reactions array
}

// Create the Reaction schema
const reactionSchema: Schema = new Schema({
    reactionId: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
}, {
    toJSON: {
        getters: true,
    },
});

// Create the Thought schema
const thoughtSchema: Schema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema], // Embed the reactionSchema directly
}, {
    toJSON: {
        virtuals: true,
    },
});

// Create the Thought model
const Thought = mongoose.model<IThought>('Thought', thoughtSchema);

// Create the Reaction model
const Reaction = mongoose.model<IReaction>('Reaction', reactionSchema);

// Export the schemas and models
export { Thought as modelThoughtRouter, Reaction, reactionSchema };
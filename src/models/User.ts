import mongoose, { model, Schema, Document } from 'mongoose'; 

// Define the User interface
interface IUser extends Document {
    username: string;
    email: string;
    thoughts: mongoose.Types.ObjectId[];
    friends: mongoose.Types.ObjectId[];
    createdAt: Date; // Add createdAt to the interface
    updatedAt: Date; // Add updatedAt to the interface
    formattedCreatedAt: string; // Add formattedCreatedAt to the interface
    formattedUpdatedAt: string; // Add formattedUpdatedAt to the interface
    friendCount: number; // Add friendCount to the interface
}

// Create the User schema
const userSchema: Schema<IUser> = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    thoughts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thought', // Correct reference
    }],
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Correct reference
    }],
}, 
{
    toJSON: {
        getters: true,
    },
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Virtual for friend count
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// Getter for formatted createdAt
userSchema.virtual('formattedCreatedAt').get(function() {
    return this.createdAt.toLocaleString(); // Format as desired
});

// Getter for formatted updatedAt
userSchema.virtual('formattedUpdatedAt').get(function() {
    return this.updatedAt.toLocaleString(); // Format as desired
});

// Create the User model
const User = model<IUser>('User', userSchema);

// Export the User model
export { User as modelUserRouter };
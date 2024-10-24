import mongoose from 'mongoose';

// Define user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Ensure username is unique
    },
    password: {
        type: String,
        required: true,
    },
});

// Create user model
const User = mongoose.model('User', userSchema);

export default User;

import mongoose from 'mongoose';

const { model } = mongoose;

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        profilePic: { type: String, default: '' },
        isAdmin: { type: Boolean, default: false },
    },
    { timestamps: true },
);

const User = model('User', UserSchema);

export default User;

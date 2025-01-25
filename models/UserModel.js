import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    isDone: {
        type: Boolean,
        default: false
    }
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
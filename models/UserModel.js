import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
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
    },
    flightBookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FlightData'
    }],
    stayBookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StayData'
    }]
}, {
    timestamps: true
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
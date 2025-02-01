import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({

    requestId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,

    },
    onModel: {
        type: String,
        required: true,
        enum: ['StayData', 'FlightData']
    },
    content: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.models.Comment || mongoose.model('Comment', CommentSchema);
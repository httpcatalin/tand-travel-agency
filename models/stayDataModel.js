import mongoose from 'mongoose';

const StayDataSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  checkIn: {
    type: Date,
    required: true
  },
  checkOut: {
    type: Date,
    required: true
  },
  nights: {
    type: Number,
    required: true,
    min: 1,
    max: 14
  },
  adults: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  children: {
    type: Number,
    default: 0,
    max: 4
  },
  price: {
    type: Number,
    min: 0
  }
}, {
  timestamps: true
});

// Validation to ensure checkOut is after checkIn
StayDataSchema.pre('save', function(next) {
  if (this.checkOut <= this.checkIn) {
    next(new Error('Check-out date must be after check-in date'));
  }
  next();
});

export default mongoose.models.StayData || mongoose.model('StayData', StayDataSchema);
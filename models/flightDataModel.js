import mongoose from 'mongoose';

const FlightDataSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isDone: {
    type: Boolean,
    default: false
  },
  from: {
    type: String,
    required: true
  },

  to: {
    type: String,
    required: true
  },
  departureAirportCode: {
    type: String,
    required: true
  },
  arrivalAirportCode: {
    type: String,
    required: true
  },
  trip: {
    type: String,
    enum: ['oneway', 'roundtrip'],
    required: true
  },
  departDate: {
    type: Date,
    required: true
  },
  returnDate: {
    type: Date,
    required: function () {
      return this.trip === 'roundtrip';
    }
  },
  class: {
    type: String,
    enum: ['economy', 'premium_economy', 'business', 'first'],
    required: true
  },
  adult: {
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
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
}, {
  timestamps: true
});

export default mongoose.models.FlightData || mongoose.model('FlightData', FlightDataSchema);
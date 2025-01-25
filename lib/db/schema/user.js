import { Schema } from "mongoose";
import mongoose from 'mongoose';
const emailSchema = new Schema({
  _id: false,
  email: { type: String, required: true, unique: true },
  emailVerifiedAt: { type: Date || null, required: false, default: null },
  primary: { type: Boolean, default: false },
  inVerification: { type: Boolean, default: false },
});

const favouriteFlightsSchema = new Schema({
  _id: false,
  flightId: { type: Schema.Types.ObjectId, ref: "Flight", required: true },
  flightNumber: { type: String, required: true },
  flightClass: { type: String, required: true },
});



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



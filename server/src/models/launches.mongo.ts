import { Schema, model } from "mongoose";

import { ILaunch } from "../types/global";

const launchesSchema = new Schema<ILaunch>({
  flightNumber: {
    type: Number,
    required: true,
  },
  launchDate: {
    type: Date,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  rocket: {
    type: String,
    required: true,
  },
  customers: [String],
  target: {
    type: String,
  },
  upcoming: {
    type: Boolean,
    required: true,
    default: true,
  },
  success: {
    type: Boolean,
    required: true,
    default: true,
  },
});

export default model<ILaunch>("Launch", launchesSchema);

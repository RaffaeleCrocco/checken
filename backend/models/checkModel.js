import mongoose from "mongoose";

const checkSchema = mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    agent: {
      type: String,
    },
    place: {
      type: String,
    },
    time: {
      type: Date,
      required: true,
    },
    isAssigned: {
      type: Boolean,
      default: false,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Check = mongoose.model("Check", checkSchema);

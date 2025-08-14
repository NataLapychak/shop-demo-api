import mongoose from "mongoose";

const counterSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 },
  },
  { bufferCommands: false }
);

export default mongoose.model("Counter", counterSchema, "counters");

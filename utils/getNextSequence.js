import Counter from "../models/counter.js";
import { connectDB } from "../db/connectDB.js";

export async function getNextSequence(name) {
  await connectDB();

  const doc = await Counter.findByIdAndUpdate(
    name,
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  ).lean();

  return String(doc.seq);
}

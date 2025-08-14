import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connectDB(uri = process.env.MONGO_URI) {
  if (!uri) throw new Error("MONGO_URI is not defined");

  mongoose.set("bufferCommands", false);
  mongoose.set("bufferTimeoutMS", 0);

  if (mongoose.connection.readyState === 1) return;
  if (mongoose.connection.readyState === 2) {
    await mongoose.connection.asPromise();
    return;
  }

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10_000,
    dbName: "shop",
  });

  console.log("MongoDB connected");
}

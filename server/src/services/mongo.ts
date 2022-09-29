import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const MONGO_URL = process.env.MONGO_DB_URL;

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready.");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

export async function mongoConnect() {
  if (MONGO_URL) {
    await mongoose.connect(MONGO_URL);
  } else {
    throw new Error("MONGO_URL doesn't exists!!");
  }
}

export async function mongoDisconnect() {
  await mongoose.disconnect();
}

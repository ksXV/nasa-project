import http from "http";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

import app from "./app.mjs";

import { loadPlanetsData } from "./models/planets.model.mjs";

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

if (process.env.MONGO_DB_URL) {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
  } catch (err) {
    console.log(err);
  }
} else {
  throw new Error("Databases link is not valid.");
}

await loadPlanetsData();

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

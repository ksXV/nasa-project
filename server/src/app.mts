import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";

import morgan from "morgan";

import planetsRouter from "./routes/planets/planets.router.mjs";
import launchesRouter from "./routes/launches/launch.router.mjs";

const app = express();

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(morgan("combined"));

app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/planets", planetsRouter);
app.use("/launches", launchesRouter);
// app.get("/*", (_req, res) => {
//   res.sendFile(path.join(__dirname, "..", "public", "index.html"));
// });

export default app;

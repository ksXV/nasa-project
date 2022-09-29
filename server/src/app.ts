import path from "path";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

import { fileURLToPath } from "url";

import api from "./routes/api";

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
app.use(helmet());

app.use("/v1", api);

app.use(express.static(path.join(__dirname, "..", "public")));
app.get("/*", (_req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

export default app;

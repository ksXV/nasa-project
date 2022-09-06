import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export default app;

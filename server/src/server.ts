import http from "http";

import app from "./app";

import { loadPlanetsData } from "./models/planets.model";
import { loadLaunchesData } from "./models/launches.model";
import { mongoConnect } from "./services/mongo";

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);
try {
  await mongoConnect();
  await loadLaunchesData();
  await loadPlanetsData();
} catch (err) {
  throw new Error(`Something went wrong here ${(err as Error).message}`);
}
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

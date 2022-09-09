import http from "http";

import app from "./app.mjs";

import { loadPlanetsData } from "./models/planets.model.mjs";

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

await loadPlanetsData();

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

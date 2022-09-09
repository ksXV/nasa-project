import express from "express";

import httpGetAllPlanets from "./planets.controller.mjs";

const planetsRouter = express.Router();

planetsRouter.get("/", httpGetAllPlanets);

export default planetsRouter;

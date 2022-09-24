import { Request, Response } from "express";
import { getAllPlanets } from "../../models/planets.model.mjs";

async function httpGetAllPlanets(req: Request, res: Response) {
  return res.status(200).json(await getAllPlanets());
}
export default httpGetAllPlanets;

import { Request, Response } from "express";
import { getAllPlanets } from "../../models/planets.model";

async function httpGetAllPlanets(_req: Request, res: Response) {
  return res.status(200).json(await getAllPlanets());
}
export default httpGetAllPlanets;

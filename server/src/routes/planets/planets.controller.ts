import { Request, Response } from "express";
import planets from "../../models/planets.model";

async function httpGetAllPlanets(req: Request, res: Response) {
  return res.status(200).json(planets);
}
export default httpGetAllPlanets;

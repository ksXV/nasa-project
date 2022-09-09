import { Request, Response } from "express";
declare function httpGetAllPlanets(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export default httpGetAllPlanets;

import { Request, Response } from "express";
import { ILaunchReqBody } from "../../types/global";
export declare function httpGetAllLaunches(req: Request, res: Response): Response<any, Record<string, any>>;
export declare function httpAddNewLaunch(req: Request<{}, {}, ILaunchReqBody<string | Date>>, res: Response): Response<any, Record<string, any>>;
export declare function httpAbortLaunch(req: Request<{
    id: string;
}>, res: Response): Response<any, Record<string, any>>;

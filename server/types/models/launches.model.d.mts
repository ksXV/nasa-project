import { ILaunch, ILaunchReqBody } from "../types/global";
export declare function addNewLaunch(launch: ILaunchReqBody<string | Date>): void;
export declare function existsLaunchWithId(launchId: number): boolean;
export declare function abortLaunchById(launchId: number): ILaunch | undefined;
export declare function getAllLaunches(): Array<ILaunch>;

import { ILaunch, ILaunchReqBody } from "../types/global";

let latestFlightNumber = 100;

const launches: Map<number, ILaunch> = new Map();

const launch: ILaunch = {
  flightNumber: 100,
  mission: "Kepler Exploration",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27,2030"),
  target: "Kepler-442 b",
  customer: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

export function addNewLaunch(launch: ILaunchReqBody<string | Date>) {
  latestFlightNumber++;
  launches.set(latestFlightNumber, createLaunchObject(launch));
}

export function existsLaunchWithId(launchId: number) {
  return launches.has(launchId);
}

export function abortLaunchById(launchId: number) {
  const aborted = launches.get(launchId);
  if (aborted) {
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
  }
}

function createLaunchObject(launchObj: ILaunchReqBody<string | Date>): ILaunch {
  return Object.assign(launchObj, {
    flightNumber: latestFlightNumber,
    customer: ["ZTM", "NASA"],
    upcoming: true,
    success: true,
  }) as unknown as ILaunch;
}

launches.set(launch.flightNumber, launch);

export function getAllLaunches(): Array<ILaunch> {
  return Array.from(launches.values());
}

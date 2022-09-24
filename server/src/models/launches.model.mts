import { ILaunchReqBody } from "../types/global";

import * as launches from "./launches.mongo.mjs";
import * as plantes from "./plantes.mongo.mjs";

const DEFAULT_FLIGHT_NUMBER = 100;

async function validatePlanet(planetName: string) {
  return await plantes.default.findOne({
    keplerName: planetName,
  });
}

async function getLatestFlightNumber() {
  const latestFlightNumber = await launches.default
    .findOne()
    .sort("-flightNumber");

  if (!latestFlightNumber) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  return latestFlightNumber.flightNumber;
}

export async function scheduleNewLaunch(launch: ILaunchReqBody<Date>) {
  if (!(await validatePlanet(launch.target))) {
    throw new Error("No matching planet was found.");
  }

  const newflightNumber = (await getLatestFlightNumber()) + 1;

  const launchDocument = await launches.default.create({
    ...launch,
    flightNumber: newflightNumber,
    customers: ["ZTM", "NASA"],
  });
  await launchDocument.save();
}

export async function existsLaunchWithId(launchId: number) {
  return await launches.default.findOne({
    flightNumber: launchId,
  });
}

export async function abortLaunchById(launchId: number) {
  const aborted = await launches.default.findOneAndUpdate(
    {
      flightNumber: launchId,
    },
    {
      upcoming: false,
      success: false,
    }
  );

  return aborted;
}

export async function getAllLaunches() {
  return await launches.default.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
}

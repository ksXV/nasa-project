import { ILaunch, ILaunchReqBody } from "../types/global";
import axios from "axios";

import * as launches from "./launches.mongo";
import * as plantes from "./plantes.mongo";

const DEFAULT_FLIGHT_NUMBER = 100;

const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";

async function validatePlanet(planetName: string) {
  return await plantes.default.findOne({
    keplerName: planetName,
  });
}

async function populateLaunches() {
  const response = await axios.post(SPACEX_API_URL, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: "rocket",
          select: {
            name: 1,
          },
        },
        {
          path: "payloads",
          select: {
            customers: 1,
          },
        },
      ],
    },
  });

  if (response.status !== 200) {
    console.log("Problem with downloading launches data!!");
    throw new Error("Launch data download failed");
  }

  const launchDocs = response.data.docs;
  for (const launchDoc of launchDocs) {
    const payload: { customers: string }[] = launchDoc["payloads"];
    const customers = payload.flatMap((payload) => {
      return payload["customers"];
    });
    const launch = {
      flightNumber: launchDoc["flight_number"],
      mission: launchDoc["name"],
      rocket: launchDoc["rocket"]["name"],
      launchDate: launchDoc["date_local"],
      upcoming: launchDoc["upcoming"],
      success: launchDoc["success"],
      customers,
      target: "",
    };
    console.log(`${launch.flightNumber} ${launch.mission}`);
    await saveLaunch(launch);
  }
}

export async function loadLaunchesData() {
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: "Falcon 1",
    mission: "FalconSat",
  });
  if (firstLaunch) {
    console.log("Launch data exists");
  } else {
    await populateLaunches();
  }
}

async function findLaunch(filter: { [key: string]: number | string }) {
  return await launches.default.findOne(filter);
}
async function saveLaunch(launch: ILaunch) {
  await launches.default.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
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
  return launchDocument;
}

export async function existsLaunchWithId(launchId: number) {
  return await findLaunch({
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

export async function getAllLaunches(skip: number, limit: number) {
  return await launches.default
    .find(
      {},
      {
        _id: 0,
        __v: 0,
      }
    )
    .sort({
      flightNumber: 1,
    })
    .skip(skip)
    .limit(limit);
}

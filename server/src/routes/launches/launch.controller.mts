import { Request, Response } from "express";

import {
  getAllLaunches,
  scheduleNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
} from "../../models/launches.model.mjs";

import { ILaunchReqBody } from "../../types/global";

export async function httpGetAllLaunches(req: Request, res: Response) {
  return res.status(200).json(await getAllLaunches());
}

export async function httpAddNewLaunch(
  req: Request<{}, {}, ILaunchReqBody<Date>>,
  res: Response
) {
  const launch = req.body;

  if (
    !launch.target ||
    !launch.launchDate ||
    !launch.mission ||
    !launch.rocket
  ) {
    return res.status(400).json({
      error: "Missing required launch properties.",
    });
  }

  launch.launchDate = new Date(launch.launchDate);

  if (isNaN(launch.launchDate.valueOf())) {
    return res.status(400).json({
      error: "Invalid launch date",
    });
  }

  await scheduleNewLaunch(launch);
  return res.status(201).json(launch);
}
export async function httpAbortLaunch(
  req: Request<{ id: string }>,
  res: Response
) {
  const { id } = req.params;
  const launchId = Number(id);

  if (!existsLaunchWithId(launchId))
    return res.status(404).json({
      error: "Launch not found.",
    });

  const aborted = await abortLaunchById(launchId);

  return res.status(200).json(aborted);
}

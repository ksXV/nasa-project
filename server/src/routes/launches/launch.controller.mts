import { Request, Response } from "express";
import {
  getAllLaunches,
  addNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
} from "../../models/launches.model.mjs";
import { ILaunchReqBody } from "../../types/global";

export function httpGetAllLaunches(req: Request, res: Response) {
  return res.status(200).json(getAllLaunches());
}

export function httpAddNewLaunch(
  req: Request<{}, {}, ILaunchReqBody<string | Date>>,
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

  addNewLaunch(launch);
  return res.status(201).json(launch);
}
export function httpAbortLaunch(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params;
  const launchId = Number(id);

  if (!existsLaunchWithId(launchId))
    return res.status(404).json({
      error: "Launch not found.",
    });

  const aborted = abortLaunchById(launchId);

  return res.status(200).json(aborted);
}

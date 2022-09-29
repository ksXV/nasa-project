import { Request, Response } from "express";

import {
  getAllLaunches,
  scheduleNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
} from "../../models/launches.model";
import { getPagination } from "../../services/query";

import { ILaunchReqBody } from "../../types/global";

export async function httpGetAllLaunches(
  req: Request<null, null, null, { page: string; limit: string }>,
  res: Response
) {
  const { skip, limit } = getPagination(req.query);
  const launches = await getAllLaunches(skip, limit);
  return res.status(200).json(launches);
}

export async function httpAddNewLaunch(
  req: Request<null, null, ILaunchReqBody<Date>>,
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

  const result = await scheduleNewLaunch(launch);
  return res.status(201).json(result);
}
export async function httpAbortLaunch(
  req: Request<{ id: string }>,
  res: Response
) {
  const { id } = req.params;
  const launchId = Number(id);

  if (!(await existsLaunchWithId(launchId)))
    return res.status(404).json({
      error: "Launch not found.",
    });

  const aborted = await abortLaunchById(launchId);

  if (!aborted) {
    return res.status(400).json({ error: "Launch not aborted." });
  }
  return res.status(200).json(aborted);
}

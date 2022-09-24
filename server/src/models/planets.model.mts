import fs from "fs";
import path from "path";
import { parse } from "csv-parse";
import * as plantes from "./plantes.mongo.mjs";

import { __dirname } from "../app.mjs";

interface iKeplarPlanets {
  kepid: string;
  koi_disposition: string;
  koi_insol: string;
  koi_prad: string;
  kepler_name: string;
}

function isHabitablePlanet(planet: iKeplarPlanets) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    Number(planet["koi_insol"]) > 0.36 &&
    Number(planet["koi_insol"]) < 1.11 &&
    Number(planet["koi_prad"]) < 1.6
  );
}

export function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, "..", "data", "kepler_data.csv"))
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data: iKeplarPlanets) => {
        if (isHabitablePlanet(data)) {
          savePlanet(data);
        }
      })
      .on("error", (err: any) => {
        console.log(err);
        reject(err);
      })
      .on("end", async () => {
        const habitablePlantes = await getAllPlanets();
        console.log(`${habitablePlantes.length} habitable planets found!`);
        resolve(null);
      });
  });
}

async function savePlanet(planet: iKeplarPlanets) {
  try {
    await plantes.default.updateOne(
      {
        keplerName: planet.kepler_name,
      },
      {
        keplerName: planet.kepler_name,
      },
      { upsert: true }
    );
  } catch (err) {
    console.error("Couldn't save planet to mongoDB. " + err);
  }
}

export async function getAllPlanets() {
  return await plantes.default.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
}

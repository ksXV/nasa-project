import fs from "fs";
import path from "path";
import { parse } from "csv-parse";

import { __dirname } from "../app";

interface iKeplarPlanets {
  kepid: string;
  koi_disposition: string;
  koi_insol: string;
  koi_prad: string;
  kepler_name: string;
}

const plantes: iKeplarPlanets[] = [];

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
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data: iKeplarPlanets) => {
        if (isHabitablePlanet(data)) {
          plantes.push(data);
        }
      })
      .on("error", (err: any) => {
        console.log(err);
        reject(err);
      })
      .on("end", async () => {
        console.log(`${plantes.length} habitable planets found!`);
        resolve(null);
      });
  });
}

export default plantes;

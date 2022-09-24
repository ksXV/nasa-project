import { model, Schema } from "mongoose";

export interface IPlanets {
  keplerName: string;
}

const planetsSchema = new Schema<IPlanets>({
  keplerName: {
    type: String,
    required: true,
  },
});

export default model<IPlanets>("Planet", planetsSchema);

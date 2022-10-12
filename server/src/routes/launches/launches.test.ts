import request from "supertest";

import { mongoConnect, mongoDisconnect } from "../../services/mongo";
import { loadPlanetsData } from "../../models/planets.model";
import app from "../../app";

describe("Launching API", () => {
  beforeAll(async () => {
    await mongoConnect();
    await loadPlanetsData();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe("Test GET /launches", () => {
    it("It should respond with 200 success", async () => {
      const response = await request(app).get("/v1/launches");

      expect(response.statusCode).toBe(200);
      expect(response.headers["content-type"]).toMatch(/json/);
    });
  });

  describe("Test POST /launch", () => {
    it("It should respond with 201 success", async () => {
      const completeLaunchData = {
        mission: "USS Enterprize",
        rocket: "Something",
        target: "Kepler-1652 b",
        launchDate: "January 4,2028",
      };
      const completeLaunchDataWithoutDate = {
        mission: "USS Enterprize",
        rocket: "Something",
        target: "Kepler-1652 b",
      };

      const response = await request(app)
        .post("/v1/launches")
        .send(completeLaunchData);

      const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();

      expect(response.statusCode).toBe(201);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(requestDate).toBe(responseDate);
      expect(response.body).toMatchObject(completeLaunchDataWithoutDate);
    });
  });
  it("It should catch missing required properties", async () => {
    const incompleteLaunchData = {
      mission: "USS Enterprize",
      target: "Kepler-1652 b",
      launchDate: "January 4,2028",
    };

    const response = await request(app)
      .post("/v1/launches")
      .send(incompleteLaunchData);

    expect(response.statusCode).toBe(400);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toStrictEqual({
      error: "Missing required launch properties.",
    });
  });

  it("It should catch invalid dates", async () => {
    const invalidDateLaunchData = {
      mission: "USS Enterprize",
      rocket: "Something",
      target: "Kepler-1652 b",
      launchDate: "zoom",
    };

    const response = await request(app)
      .post("/v1/launches")
      .send(invalidDateLaunchData);

    expect(response.statusCode).toBe(400);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toStrictEqual({
      error: "Invalid launch date",
    });
  });
});

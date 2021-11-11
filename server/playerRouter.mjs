import express from "express";

import * as db from "./db.mjs";

const playerRouter = express.Router();

playerRouter.get("/", async (request, response) => {
  response.json(await db.getPlayers());
});

playerRouter.get("/top", async (request, response) => {
  response.json(await db.getTopPlayers());
});

playerRouter.use(express.json());
playerRouter.post("/", async (request, response) => {
  console.log("HEYYYYY", request);
  response.status(201).json(await db.addPlayer(request.body.name));
});

playerRouter.delete("/:id", async (request, response) => {
  await db.deletePlayer(request.params.id);
  response.status(204).end();
});

playerRouter.put("/win/:name", async (request, response) => {
  await db.updateWin(request.params.name);
  response.status(200).end();
});

playerRouter.put("/loss/:name", async (request, response) => {
  await db.updateLoss(request.params.name);
  response.status(200).end();
});

playerRouter.put("/tie/:name", async (request, response) => {
  await db.updateTie(request.params.name);
  response.status(200).end();
});

export default playerRouter;

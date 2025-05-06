import { Router } from "express";
import travelTimeController from "../controllers/travelTime.controller";

export const travelTimeRouter = Router();

travelTimeRouter.get("/", travelTimeController.getTravelTimes);
travelTimeRouter.get("/:id", travelTimeController.getTravelTimeById);

travelTimeRouter.post("/", travelTimeController.createTravelTime);
travelTimeRouter.patch("/:id", travelTimeController.updateTravelTime);
travelTimeRouter.delete("/:id", travelTimeController.deleteTravelTime);


import { Router } from "express";
import { createLocalidad, deleteLocalidad, getLocalidadById, getLocalidades, updateLocalidad } from "../controllers/localidadController";

const localidadRoute=Router();

localidadRoute.get("/",getLocalidades)
localidadRoute.get("/:localidadId",getLocalidadById)
localidadRoute.post("/",createLocalidad)
localidadRoute.put("/:localidadId",updateLocalidad)
localidadRoute.delete("/:localidadId",deleteLocalidad)

export default localidadRoute;
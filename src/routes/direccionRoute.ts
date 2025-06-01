import { Router } from "express";
import { createDireccion, deleteDireccion, getDireccionById, getDirecciones, updateDireccion } from "../controllers/direccionController.ts";

const direccionRoute=Router();

direccionRoute.get("/",getDirecciones)
direccionRoute.get("/:direccionId",getDireccionById)
direccionRoute.post("/",createDireccion)
direccionRoute.put("/:direccionId",updateDireccion)
direccionRoute.delete("/:direccionId",deleteDireccion)

export default direccionRoute;
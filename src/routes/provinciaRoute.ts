import { Router } from "express";
import { createProvincia, deleteProvincia, getProvinciaById, getProvincias, updateProvincia } from "../controllers/porvinciaController";

const provinciaRoute=Router();

provinciaRoute.get("/",getProvincias)
provinciaRoute.get("/:provinciaId",getProvinciaById)
provinciaRoute.post("/",createProvincia)
provinciaRoute.put("/:provinciaId",updateProvincia)
provinciaRoute.delete("/:provinciaId",deleteProvincia)

export default provinciaRoute;
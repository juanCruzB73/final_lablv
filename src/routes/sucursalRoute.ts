import { Router } from "express";
import { createSucursal, deleteSucursal, getSucursalById, getSucursales, updateSucursal } from "../controllers/sucursalController";

const sucursalRoute=Router();

sucursalRoute.get("/",getSucursales)
sucursalRoute.get("/:sucursalId",getSucursalById)
sucursalRoute.post("/",createSucursal)
sucursalRoute.put("/:sucursalId",updateSucursal)
sucursalRoute.delete("/:sucursalId",deleteSucursal)

export default sucursalRoute;
import { Router } from "express";
import { createFactura, deleteFactura, getFacturaById, getFacturas, updateFactura } from "../controllers/facturaController";

const facturaRoute=Router();

facturaRoute.get("/",getFacturas)
facturaRoute.get("/:facturaId",getFacturaById)
facturaRoute.post("/",createFactura)
facturaRoute.put("/:facturaId",updateFactura)
facturaRoute.delete("/:facturaId",deleteFactura)

export default facturaRoute;
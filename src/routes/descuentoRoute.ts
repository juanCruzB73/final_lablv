import { Router } from "express";
import { createDescuento, deleteDescuento, getDescuentoById, getDescuentos, updateDescuento } from "../controllers/descuentoController.ts";

const descuentoRoute=Router();

descuentoRoute.get("/",getDescuentos)
descuentoRoute.get("/:descuentoId",getDescuentoById)
descuentoRoute.post("/",createDescuento)
descuentoRoute.put("/:descuentoId",updateDescuento)
descuentoRoute.delete("/:descuentoId",deleteDescuento)

export default descuentoRoute;
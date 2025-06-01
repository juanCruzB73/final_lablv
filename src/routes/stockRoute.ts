import { Router } from "express";
import { createStockProducto, deleteStockProducto, getStockProductoById, getStockProductos, updateStockProducto } from "../controllers/stockController.ts";

const stockRoute=Router();

stockRoute.get("/",getStockProductos)
stockRoute.get("/:stockId",getStockProductoById)
stockRoute.post("/",createStockProducto)
stockRoute.put("/:stockId",updateStockProducto)
stockRoute.delete("/:stockId",deleteStockProducto)

export default stockRoute;
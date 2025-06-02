import { Router } from "express";
import { createProducto, deleteProducto, getProductoById, getProductos, updateProducto } from "../controllers/productoController";

const productRoute=Router();

productRoute.get("/",getProductos)
productRoute.get("/:productoId",getProductoById)
productRoute.post("/",createProducto)
productRoute.put("/:productoId",updateProducto)
productRoute.delete("/:productoId",deleteProducto)

export default productRoute;
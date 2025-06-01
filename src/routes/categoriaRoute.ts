import { Router } from "express";
import { createCategoria, deleteCategoria, getCategoriaById, getCategorias, updateCategoria } from "../controllers/categoriaController.ts";

const categoryRoute=Router();

categoryRoute.get("/",getCategorias)
categoryRoute.get("/:categoriId",getCategoriaById)
categoryRoute.post("/",createCategoria)
categoryRoute.put("/:categoriId",updateCategoria)
categoryRoute.delete("/:categoriId",deleteCategoria)

export default categoryRoute;
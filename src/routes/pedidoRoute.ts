import { Router } from "express";
import { createPedido, deletePedido, getPedidoById, getPedidos, updatePedido } from "../controllers/pedidoController";

const pedidoRoute=Router();

pedidoRoute.get("/",getPedidos)
pedidoRoute.get("/:pedidoId",getPedidoById)
pedidoRoute.post("/",createPedido)
pedidoRoute.put("/:pedidoId",updatePedido)
pedidoRoute.delete("/:pedidoId",deletePedido)

export default pedidoRoute;
import { Router } from "express";
import { createDetallePedido, deleteDetallePedido, getDetallePedidoById, getDetallesPedido, updateDetallePedido } from "../controllers/detallePedidoController";

const detallePedidoRoute=Router();

detallePedidoRoute.get("/",getDetallesPedido)
detallePedidoRoute.get("/:detallePedidoId",getDetallePedidoById)
detallePedidoRoute.post("/",createDetallePedido)
detallePedidoRoute.put("/:detallePedidoId",updateDetallePedido)
detallePedidoRoute.delete("/:detallePedidoId",deleteDetallePedido)

export default detallePedidoRoute;
import { Request, Response } from "express";
import { DetallePedido } from "../models/models";
import { serializeBigInts } from "../utils/serializeBigInts";

export const getDetallesPedido = async (_req: Request, res: Response) => {
  try {
    const detalles = await DetallePedido.findMany();
    res.status(200).json({ ok: true, detalles: serializeBigInts(detalles) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching detalles del pedido" });
  }
};

export const getDetallePedidoById = async (req: Request, res: Response) => {
  try {
    const detallePedidoId = BigInt(req.params.detallePedidoId);

    const detalle = await DetallePedido.findUnique({
      where: { detallePedido_id:detallePedidoId },
    });

    if (!detalle) {
      res.status(404).json({ message: "DetallePedido not found" });
      return
    }

    res.status(200).json({ ok: true, detalle: serializeBigInts(detalle) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching detalle del pedido" });
  }
};

export const createDetallePedido = async (req: Request, res: Response): Promise<void> => {
  try {
    const { pedido_id, producto_id, cantidad, precio_unit } = req.body;

    const detalle = await DetallePedido.create({
      data: {
        pedido_id: BigInt(pedido_id),
        producto_id: BigInt(producto_id),
        cantidad,
        precio_unit,
      },
    });

    res.status(201).json({ ok: true, detalle: serializeBigInts(detalle) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating detalle del pedido" });
  }
};

export const updateDetallePedido = async (req: Request, res: Response) => {
  try {
    const detallePedidoId = BigInt(req.params.detallePedidoId);

    const { pedido_id, producto_id, cantidad, precio_unit } = req.body;

    const detalle = await DetallePedido.update({
      where: { detallePedido_id:detallePedidoId },
      data: {
        pedido_id: pedido_id ? BigInt(pedido_id) : undefined,
        producto_id: producto_id ? BigInt(producto_id) : undefined,
        cantidad,
        precio_unit,
      },
    });

    res.status(200).json({ ok: true, detalle: serializeBigInts(detalle) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating detalle del pedido" });
  }
};

export const deleteDetallePedido = async (req: Request, res: Response) => {
  try {
    const detallePedidoId = BigInt(req.params.detallePedidoId);

    await DetallePedido.delete({
      where: { detallePedido_id:detallePedidoId },
    });

    res.status(200).json({ ok: true, message: "DetallePedido deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting detalle del pedido" });
  }
};
// controllers/pedidoController.ts
import { Request, Response } from 'express';
import { serializeBigInts } from '../utils/serializeBigInts';
import { Pedido } from '../models/models';


export const getPedidos = async (_req: Request, res: Response): Promise<void> => {
  try {
    const pedidos = await Pedido.findMany({
      include: {
        usuario: true,
        detalles: true,
        factura: true,
      },
    });
    res.status(200).json({ ok: true, pedidos: serializeBigInts(pedidos) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: 'Error loading pedidos' });
  }
};

// GET one pedido
export const getPedidoById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { pedidoId } = req.params;

    const pedido = await Pedido.findFirst({
      where: { pedido_id: BigInt(pedidoId) },
      include: {
        usuario: true,
        detalles: true,
        factura: true,
      },
    });

    if (!pedido) {
      res.status(404).json({ ok: false, message: 'Pedido not found' });
      return;
    }

    res.status(200).json({ ok: true, pedido: serializeBigInts(pedido) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: 'Error loading pedido' });
  }
};

// CREATE pedido
export const createPedido = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fecha, total, usuario_id, estado, activo } = req.body;

    const newPedido = await Pedido.create({
      data: {
        ...(fecha && { fecha: new Date(fecha) }),
        total,
        usuario_id: usuario_id ? BigInt(usuario_id) : undefined,
        estado,
        activo,
      },
    });

    res.status(201).json({ ok: true, pedido: serializeBigInts(newPedido) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: 'Error creating pedido' });
  }
};

// UPDATE pedido
export const updatePedido = async (req: Request, res: Response): Promise<void> => {
  try {
    const { pedidoId } = req.params;
    const { fecha, total, usuario_id, estado, activo } = req.body;

    const updated = await Pedido.update({
      where: { pedido_id: BigInt(pedidoId) },
      data: {
        fecha: fecha ? new Date(fecha) : undefined,
        total,
        usuario_id: usuario_id ? BigInt(usuario_id) : undefined,
        estado,
        activo,
      },
    });

    res.status(200).json({ ok: true, pedido: serializeBigInts(updated) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: 'Error updating pedido' });
  }
};

// DELETE pedido
export const deletePedido = async (req: Request, res: Response): Promise<void> => {
  try {
    const { pedidoId } = req.params;

    await Pedido.delete({
      where: { pedido_id: BigInt(pedidoId) },
    });

    res.status(200).json({ ok: true, message: 'Pedido deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: 'Error deleting pedido' });
  }
};

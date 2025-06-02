import { Request, Response } from "express";
import { Factura } from "../models/models";
import { serializeBigInts } from "../utils/serializeBigInts";

export const getFacturas = async (_req: Request, res: Response): Promise<void> => {
  try {
    const facturas = await Factura.findMany();
    res.status(200).json({ ok: true, facturas: serializeBigInts(facturas) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: 'Error fetching facturas' });
  }
};

export const getFacturaById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { facturaId } = req.params;

    const factura = await Factura.findFirst({
      where: {
        factura_id: BigInt(facturaId),
      },
    });

    if (!factura) {
      res.status(404).json({ ok: false, message: 'Factura not found' });
      return;
    }

    res.status(200).json({ ok: true, factura: serializeBigInts(factura) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: 'Error fetching factura' });
  }
};

export const createFactura = async (req: Request, res: Response): Promise<void> => {
  try {
    const { pedido_id, fecha, total, activo } = req.body;

    const newFactura = await Factura.create({
      data: {
        ...(fecha && { fecha: new Date(fecha) }),
        total,
        activo,
        pedido_id: pedido_id ? BigInt(pedido_id) : undefined,
      },
    });

    res.status(201).json({ ok: true, factura: serializeBigInts(newFactura) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: 'Error creating factura' });
  }
};

export const updateFactura = async (req: Request, res: Response): Promise<void> => {
  try {
    const { facturaId } = req.params;
    const { pedido_id, fecha, total, activo } = req.body;

    const updatedFactura = await Factura.update({
      where: {
        factura_id: BigInt(facturaId),
      },
      data: {
        ...(pedido_id && { pedido_id: BigInt(pedido_id) }),
        ...(fecha && { fecha: new Date(fecha) }),
        ...(total !== undefined && { total }),
        ...(activo !== undefined && { activo }),
      },
    });

    res.status(200).json({ ok: true, factura: serializeBigInts(updatedFactura) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: 'Error updating factura' });
  }
};

export const deleteFactura = async (req: Request, res: Response): Promise<void> => {
  try {
    const { facturaId } = req.params;

    await Factura.delete({
      where: {
        factura_id: BigInt(facturaId),
      },
    });

    res.status(200).json({ ok: true, message: 'Factura deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: 'Error deleting factura' });
  }
};

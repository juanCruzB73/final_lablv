import { Request, Response } from "express";
import { Descuento } from "../models/models.js";

export const getDescuentos = async (_req: Request, res: Response): Promise<void> => {
  try {
    const descuentos = await Descuento.findMany();
    const sanitized = descuentos.map(({ descuento_id, ...rest }) => ({
      descuento_id: descuento_id.toString(),
      ...rest,
    }));
    res.status(200).json({ ok: true, descuentos: sanitized });
    return
} catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error loading descuentos" });
    return
}
};

export const getDescuentoById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { descuentoId } = req.params;
    const descuento = await Descuento.findFirst({
      where: { descuento_id: BigInt(descuentoId) },
    });
    if (!descuento) {
    res.status(404).json({ message: "Descuento not found" });
    return
}
    res.status(200).json({
      ok: true,
      descuento: { ...descuento, descuento_id: descuento.descuento_id.toString() },
    });
    return
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error loading descuento" });
    return
}
};

export const createDescuento = async (req: Request, res: Response): Promise<void> => {
  try {
    const { valor, activo } = req.body;
    const newDescuento = await Descuento.create({ data: { valor, activo } });
    res.status(201).json({
      ok: true,
      descuento: {
        ...newDescuento,
        descuento_id: newDescuento.descuento_id.toString(),
      },
    });
    return
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating descuento" });
    return
}
};

export const updateDescuento = async (req: Request, res: Response): Promise<void> => {
  try {
    const { descuentoId } = req.params;
    const { valor, activo } = req.body;
    const updated = await Descuento.update({
      where: { descuento_id: BigInt(descuentoId) },
      data: { valor, activo },
    });
    res.status(200).json({
      ok: true,
      descuento: {
        ...updated,
        descuento_id: updated.descuento_id.toString(),
      },
    });
    return
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating descuento" });
    return
  }
};

export const deleteDescuento = async (req: Request, res: Response): Promise<void> => {
  try {
    const { descuentoId } = req.params;
    await Descuento.delete({ where: { descuento_id: BigInt(descuentoId) } });
    res.status(200).json({ ok: true, message: "Descuento deleted" });
    return
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting descuento" });
    return 
  }
};

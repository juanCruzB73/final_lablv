import { Request, Response } from "express";
import { serializeBigInts } from "../utils/serializeBigInts";
import { Direccion } from "../models/models";

export const getDirecciones = async (req: Request, res: Response): Promise<void> => {
  try {
    const direcciones = await Direccion.findMany();
    res.status(200).json({ ok: true, direcciones: serializeBigInts(direcciones) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error loading direcciones" });
  }
};

export const getDireccionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { direccionId } = req.params;
    if (!direccionId) {
      res.status(400).json({ message: "Direccion ID is required" });
      return;
    }

    const direccion = await Direccion.findFirst({
      where: { direccion_id: BigInt(direccionId) }
    });

    if (!direccion) {
      res.status(404).json({ message: "Direccion not found" });
      return;
    }

    res.status(200).json({ ok: true, direccion: serializeBigInts(direccion) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error loading direccion" });
  }
};

export const createDireccion = async (req: Request, res: Response): Promise<void> => {
  try {
    const { calle, numero, localidad_id, activo } = req.body;

    const nuevaDireccion = await Direccion.create({
      data: { calle, numero, localidad_id, activo }
    });

    res.status(201).json({ ok: true, direccion: serializeBigInts(nuevaDireccion) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating direccion" });
  }
};

export const updateDireccion = async (req: Request, res: Response): Promise<void> => {
  try {
    const { direccionId } = req.params;
    const { calle, numero, localidad_id, activo } = req.body;

    const direccionExistente = await Direccion.findFirst({
      where: { direccion_id: BigInt(direccionId) }
    });

    if (!direccionExistente) {
      res.status(404).json({ message: "Direccion not found" });
      return;
    }

    const direccionActualizada = await Direccion.update({
      where: { direccion_id: BigInt(direccionId) },
      data: { calle, numero, localidad_id, activo }
    });

    res.status(200).json({ ok: true, direccion: serializeBigInts(direccionActualizada) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating direccion" });
  }
};

export const deleteDireccion = async (req: Request, res: Response): Promise<void> => {
  try {
    const { direccionId } = req.params;

    const direccionExistente = await Direccion.findFirst({
      where: { direccion_id: BigInt(direccionId) }
    });

    if (!direccionExistente) {
      res.status(404).json({ message: "Direccion not found" });
      return;
    }

    await Direccion.delete({
      where: { direccion_id: BigInt(direccionId) }
    });

    res.status(200).json({ ok: true, message: "Direccion deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting direccion" });
  }
};

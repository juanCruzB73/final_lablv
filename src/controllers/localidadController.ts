import { Request, Response } from "express";
import { Localidad } from "../models/models.ts";
import { serializeBigInts } from "../utils/serializeBigInts.ts";

export const getLocalidades = async (_req: Request, res: Response): Promise<void> => {
  try {
    const localidades = await Localidad.findMany();
    res.status(200).json({ ok: true, localidades: serializeBigInts(localidades) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error loading localidades" });
  }
};

export const getLocalidadById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { localidadId } = req.params;

    if (!localidadId) {
      res.status(400).json({ message: "Localidad ID is required" });
      return;
    }

    const localidad = await Localidad.findFirst({
      where: { localidad_id: BigInt(localidadId) },
    });

    if (!localidad) {
      res.status(404).json({ message: "Localidad not found" });
      return;
    }

    res.status(200).json({ ok: true, localidad: serializeBigInts(localidad) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error getting localidad" });
  }
};

export const createLocalidad = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombre, provincia_id, activo } = req.body;

    const nuevaLocalidad = await Localidad.create({
      data: { nombre, provincia_id, activo },
    });

    res.status(201).json({
      ok: true,
      localidad: serializeBigInts(nuevaLocalidad),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating localidad" });
  }
};

export const updateLocalidad = async (req: Request, res: Response): Promise<void> => {
  try {
    const { localidadId } = req.params;
    const { nombre, provincia_id, activo } = req.body;

    const localidadExistente = await Localidad.findFirst({
      where: { localidad_id: BigInt(localidadId) },
    });

    if (!localidadExistente) {
      res.status(404).json({ message: "Localidad not found" });
      return;
    }

    const localidadActualizada = await Localidad.update({
      where: { localidad_id: BigInt(localidadId) },
      data: { nombre, provincia_id, activo },
    });

    res.status(200).json({ ok: true, localidad: serializeBigInts(localidadActualizada) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating localidad" });
  }
};

export const deleteLocalidad = async (req: Request, res: Response): Promise<void> => {
  try {
    const { localidadId } = req.params;

    const localidad = await Localidad.findFirst({
      where: { localidad_id: BigInt(localidadId) },
    });

    if (!localidad) {
      res.status(404).json({ message: "Localidad not found" });
      return;
    }

    await Localidad.delete({
      where: { localidad_id: BigInt(localidadId) },
    });

    res.status(200).json({ ok: true, message: "Localidad deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting localidad" });
  }
};

import { Request, Response } from "express";
import { Provincia } from "../models/models";
import { serializeBigInts } from "../utils/serializeBigInts";

export const getProvincias = async (_req: Request, res: Response): Promise<void> => {
  try {
    const provincias = await Provincia.findMany();
    res.status(200).json({ ok: true, provincias: serializeBigInts(provincias) });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error loading provincias" });
    return;
  }
};

export const getProvinciaById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { provinciaId } = req.params;
    if (!provinciaId) {
      res.status(400).json({ message: "Provincia ID is required" });
      return;
    }

    const provincia = await Provincia.findFirst({
      where: { provincia_id: BigInt(provinciaId) },
    });

    if (!provincia) {
      res.status(404).json({ message: "Provincia not found" });
      return;
    }

    res.status(200).json({
      ok: true,
      provincia: serializeBigInts(provincia),
    });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error getting provincia" });
    return;
  }
};

export const createProvincia = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombre, pais_id, activo } = req.body;
    const nuevaProvincia = await Provincia.create({
      data: { nombre, activo },
    });

    res.status(201).json({
      ok: true,
      provincia: serializeBigInts(nuevaProvincia),
    });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating provincia" });
    return;
  }
};

export const updateProvincia = async (req: Request, res: Response): Promise<void> => {
  try {
    const { provinciaId } = req.params;
    const { nombre, pais_id, activo } = req.body;

    const provinciaExistente = await Provincia.findFirst({
      where: { provincia_id: BigInt(provinciaId) },
    });

    if (!provinciaExistente) {
      res.status(404).json({ message: "Provincia not found" });
      return;
    }

    const provinciaActualizada = await Provincia.update({
      where: { provincia_id: BigInt(provinciaId) },
      data: { nombre, activo },
    });

    res.status(200).json({
      ok: true,
      provincia: serializeBigInts(provinciaActualizada),
    });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating provincia" });
    return;
  }
};

export const deleteProvincia = async (req: Request, res: Response): Promise<void> => {
  try {
    const { provinciaId } = req.params;

    const provincia = await Provincia.findFirst({
      where: { provincia_id: BigInt(provinciaId) },
    });

    if (!provincia) {
      res.status(404).json({ message: "Provincia not found" });
      return;
    }

    await Provincia.delete({
      where: { provincia_id: BigInt(provinciaId) },
    });

    res.status(200).json({ ok: true, message: "Provincia deleted successfully" });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting provincia" });
    return;
  }
};


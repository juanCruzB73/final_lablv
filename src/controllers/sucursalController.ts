import { Request, Response } from "express";
import { Sucursal } from "../models/models";
import { serializeBigInts } from "../utils/serializeBigInts";

export const getSucursales = async (req: Request, res: Response): Promise<void> => {
  try {
    const sucursales = await Sucursal.findMany();
    res.status(200).json({ ok: true, sucursales: serializeBigInts(sucursales) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error loading sucursales" });
  }
};

export const getSucursalById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sucursalId } = req.params;

    if (!sucursalId) {
      res.status(400).json({ message: "Missing sucursalId in request params" });
      return;
    }

    const sucursal = await Sucursal.findFirst({
      where: { sucursal_id: BigInt(sucursalId) }
    });

    if (!sucursal) {
      res.status(404).json({ message: "Sucursal not found" });
      return;
    }

    res.status(200).json({ ok: true, sucursal: serializeBigInts(sucursal) });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error loading sucursal" });
    return;
  }
};

export const createSucursal = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombre, direccion_id, activo } = req.body;

    const nuevaSucursal = await Sucursal.create({
      data: {
        nombre,
        direccion_id,
        activo
      }
    });

    res.status(201).json({
      ok: true,
      sucursal: serializeBigInts(nuevaSucursal)
    });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating sucursal" });
    return;
  }
};

export const updateSucursal = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sucursalId } = req.params;
    const { nombre, direccion_id, activo } = req.body;

    if (!sucursalId) {
      res.status(400).json({ message: "Missing sucursalId in request params" });
      return;
    }

    const sucursalExistente = await Sucursal.findFirst({
      where: { sucursal_id: BigInt(sucursalId) }
    });

    if (!sucursalExistente) {
      res.status(404).json({ message: "Sucursal not found" });
      return;
    }

    const sucursalActualizada = await Sucursal.update({
      where: { sucursal_id: BigInt(sucursalId) },
      data: {
        nombre,
        direccion_id,
        activo
      }
    });

    res.status(200).json({ ok: true, sucursal: serializeBigInts(sucursalActualizada) });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating sucursal" });
    return;
  }
};

export const deleteSucursal = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sucursalId } = req.params;

    if (!sucursalId) {
      res.status(400).json({ message: "Missing sucursalId in request params" });
      return;
    }

    const sucursal = await Sucursal.findFirst({
      where: { sucursal_id: BigInt(sucursalId) }
    });

    if (!sucursal) {
      res.status(404).json({ message: "Sucursal not found" });
      return;
    }

    await Sucursal.delete({
      where: { sucursal_id: BigInt(sucursalId) }
    });

    res.status(200).json({ ok: true, message: "Sucursal deleted successfully" });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting sucursal" });
    return;
  }
};

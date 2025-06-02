import { Request, Response } from "express";
import { StockProducto } from "../models/models";
import { serializeBigInts } from "../utils/serializeBigInts";



export const getStockProductos = async (_req: Request, res: Response): Promise<void> => {
  try {
    const stockProductos = await StockProducto.findMany();
    res.status(200).json({ ok: true, stockProductos: serializeBigInts(stockProductos) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error loading stockProductos" });
  }
};

export const getStockProductoById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { stockId } = req.params;

    const stockProducto = await StockProducto.findFirst({
      where: { id: BigInt(stockId) }
    });

    if (!stockProducto) {
      res.status(404).json({ message: "StockProducto not found" });
      return;
    }

    res.status(200).json({ ok: true, stockProducto: serializeBigInts(stockProducto) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error loading stockProducto" });
  }
};

export const createStockProducto = async (req: Request, res: Response): Promise<void> => {
  try {
    const { producto_id, sucursal_id, stock, activo } = req.body;

    const nuevoStock = await StockProducto.create({
      data: {
        producto_id,
        sucursal_id,
        stock,
        activo
      }
    });

    res.status(201).json({ ok: true, stockProducto: serializeBigInts(nuevoStock) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating stockProducto" });
  }
};

export const updateStockProducto = async (req: Request, res: Response): Promise<void> => {
  try {
    const { stockId } = req.params;
    const { producto_id, sucursal_id, stock, activo } = req.body;

    const stockExistente = await StockProducto.findFirst({
      where: { id: BigInt(stockId) }
    });

    if (!stockExistente) {
      res.status(404).json({ message: "StockProducto not found" });
      return;
    }

    const stockActualizado = await StockProducto.update({
      where: { id: BigInt(stockId) },
      data: {
        producto_id,
        sucursal_id,
        stock,
        activo
      }
    });

    res.status(200).json({ ok: true, stockProducto: serializeBigInts(stockActualizado) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating stockProducto" });
  }
};

export const deleteStockProducto = async (req: Request, res: Response): Promise<void> => {
  try {
    const { stockId } = req.params;

    const stockExistente = await StockProducto.findFirst({
      where: { id: BigInt(stockId) }
    });

    if (!stockExistente) {
      res.status(404).json({ message: "StockProducto not found" });
      return;
    }

    await StockProducto.delete({
      where: { id: BigInt(stockId) }
    });

    res.status(200).json({ ok: true, message: "StockProducto deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting stockProducto" });
  }
};

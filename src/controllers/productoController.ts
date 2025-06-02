import { Request, Response } from "express";
import { Producto } from "../models/models";
import { serializeBigInts } from "../utils/serializeBigInts";

export const getProductos = async (_req: Request, res: Response): Promise<void> => {
  try {
    const productos = await Producto.findMany({
      include: {
        categoria: true,
        descuento: true,
        imagenes: true,
        stockProductos: true
      }
    });
    res.status(200).json({ ok: true, productos: serializeBigInts(productos) });
    return
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error loading productos" });
    return
  }
};

export const getProductoById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productoId } = req.params;
    const producto = await Producto.findFirst({
      where: { producto_id: BigInt(productoId) },
      include: {
        categoria: true,
        descuento: true,
        imagenes: true,
        stockProductos: true
      }
    });
    if (!producto) {
    res.status(404).json({ message: "Producto not found" });
    return
    }
    res.status(200).json({
      ok: true,
      producto: serializeBigInts(producto)
    });
    return
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error loading producto" });
    return
  }
};

export const createProducto = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombre, descripcion, precio, categoria_id, descuento_id, activo } = req.body;

    const nuevoProducto = await Producto.create({
      data: {
        nombre,
        descripcion,
        precio,
        categoria_id,
        descuento_id,
        activo
      }
    });

    res.status(201).json({
      ok: true,
      producto: serializeBigInts(nuevoProducto)
    });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating producto" });
    return;
  }
};


export const updateProducto = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productoId } = req.params;
    const { nombre, descripcion, precio, categoria_id, descuento_id, activo } = req.body;

    const productoExistente = await Producto.findFirst({
      where: { producto_id: BigInt(productoId) }
    });

    if (!productoExistente) {
      res.status(404).json({ message: "Producto not found" });
      return;
    }

    const productoActualizado = await Producto.update({
      where: { producto_id: BigInt(productoId) },
      data: {
        nombre,
        descripcion,
        precio,
        categoria_id,
        descuento_id,
        activo
      }
    });

    res.status(200).json({
      ok: true,
      producto: serializeBigInts(productoActualizado)
    });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating producto" });
    return;
  }
};

export const deleteProducto = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productoId } = req.params;

    const productoExistente = await Producto.findFirst({
      where: { producto_id: BigInt(productoId) }
    });

    if (!productoExistente) {
      res.status(404).json({ message: "Producto not found" });
      return;
    }

    await Producto.delete({
      where: { producto_id: BigInt(productoId) }
    });

    res.status(200).json({
      ok: true,
      message: "Producto deleted successfully"
    });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting producto" });
    return;
  }
};

import { Request, Response } from "express";
import { Categoria } from "../models/models.js";

export const getCategorias = async (_req: Request, res: Response): Promise<void> => {
  try {
    const categorias = await Categoria.findMany();
    const sanitized = categorias.map(({ categoria_id, ...rest }) => ({
      categoria_id: categoria_id.toString(),
      ...rest,
    }));
    res.status(200).json({ ok: true, categorias: sanitized });
    return
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error loading categorias" });
    return
  }
};

export const getCategoriaById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { categoriId } = req.params;
    const categoria = await Categoria.findFirst({
      where: { categoria_id: BigInt(categoriId) },
    });
    if (!categoria) {
    res.status(404).json({ message: "Categoria not found" });
    return
    }
    res.status(200).json({
      ok: true,
      categoria: { ...categoria, categoria_id: categoria.categoria_id.toString() },
    });
    return
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error loading categoria" });
    return
  }
};

export const createCategoria = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombre, activo } = req.body;
    const newCategoria = await Categoria.create({ data: { nombre, activo } });
    res.status(201).json({
      ok: true,
      categoria: {
        ...newCategoria,
        categoria_id: newCategoria.categoria_id.toString(),
      },
    });
    return
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating categoria" });
    return
  }
};

export const updateCategoria = async (req: Request, res: Response): Promise<void> => {
  try {
    const { categoriId } = req.params;
    const { nombre, activo } = req.body;
    const updated = await Categoria.update({
      where: { categoria_id: BigInt(categoriId) },
      data: { nombre, activo },
    });
    res.status(200).json({
      ok: true,
      categoria: {
        ...updated,
        categoria_id: updated.categoria_id.toString(),
      },
    });
    return
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating categoria" });
    return
  }
};

export const deleteCategoria = async (req: Request, res: Response): Promise<void> => {
  try {
    const { categoriId } = req.params;
    await Categoria.delete({ where: { categoria_id: BigInt(categoriId) } });
    res.status(200).json({ ok: true, message: "Categoria deleted" });
    return
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting categoria" });
    return
  }
};

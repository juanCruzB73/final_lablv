import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const Categoria = prisma.categoria;
export const Descuento = prisma.descuento;
export const Producto = prisma.producto;
export const Imagen = prisma.imagen;
export const Sucursal = prisma.sucursal;
export const Provincia = prisma.provincia;
export const Localidad = prisma.localidad;
export const Direccion = prisma.direccion;
export const User = prisma.usuario;
export const StockProducto = prisma.stockProducto;
export const Pedido = prisma.pedido;
export const Factura = prisma.factura;
export const DetallePedido = prisma.detallePedido;


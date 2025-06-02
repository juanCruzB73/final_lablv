/*
  Warnings:

  - You are about to drop the column `pais_id` on the `Provincia` table. All the data in the column will be lost.
  - The primary key for the `Usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the `ProductoAlergeno` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductoAlergeno" DROP CONSTRAINT "ProductoAlergeno_producto_id_fkey";

-- AlterTable
ALTER TABLE "Provincia" DROP COLUMN "pais_id";

-- AlterTable
ALTER TABLE "Usuario" DROP CONSTRAINT "Usuario_pkey",
DROP COLUMN "id",
ADD COLUMN     "usuario_id" BIGSERIAL NOT NULL,
ADD CONSTRAINT "Usuario_pkey" PRIMARY KEY ("usuario_id");

-- DropTable
DROP TABLE "ProductoAlergeno";

-- CreateTable
CREATE TABLE "DetallePedido" (
    "id" BIGSERIAL NOT NULL,
    "pedido_id" BIGINT,
    "producto_id" BIGINT,
    "cantidad" INTEGER NOT NULL,
    "precio_unit" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "DetallePedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Factura" (
    "factura_id" BIGSERIAL NOT NULL,
    "pedido_id" BIGINT,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total" DOUBLE PRECISION,
    "activo" BOOLEAN DEFAULT true,

    CONSTRAINT "Factura_pkey" PRIMARY KEY ("factura_id")
);

-- CreateTable
CREATE TABLE "Pedido" (
    "pedido_id" BIGSERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total" DOUBLE PRECISION,
    "usuario_id" BIGINT,
    "estado" VARCHAR(100),
    "activo" BOOLEAN DEFAULT true,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("pedido_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Factura_pedido_id_key" ON "Factura"("pedido_id");

-- AddForeignKey
ALTER TABLE "DetallePedido" ADD CONSTRAINT "DetallePedido_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "Pedido"("pedido_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetallePedido" ADD CONSTRAINT "DetallePedido_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "Producto"("producto_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Factura" ADD CONSTRAINT "Factura_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "Pedido"("pedido_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("usuario_id") ON DELETE SET NULL ON UPDATE CASCADE;

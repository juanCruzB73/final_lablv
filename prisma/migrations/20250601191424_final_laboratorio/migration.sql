/*
  Warnings:

  - The primary key for the `DetallePedido` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `DetallePedido` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DetallePedido" DROP CONSTRAINT "DetallePedido_pkey",
DROP COLUMN "id",
ADD COLUMN     "detallePedido_id" BIGSERIAL NOT NULL,
ADD CONSTRAINT "DetallePedido_pkey" PRIMARY KEY ("detallePedido_id");

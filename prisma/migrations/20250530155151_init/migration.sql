-- CreateTable
CREATE TABLE "Categoria" (
    "categoria_id" BIGSERIAL NOT NULL,
    "nombre" VARCHAR(255),
    "activo" BOOLEAN,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("categoria_id")
);

-- CreateTable
CREATE TABLE "Descuento" (
    "descuento_id" BIGSERIAL NOT NULL,
    "valor" VARCHAR(255),
    "activo" BOOLEAN,

    CONSTRAINT "Descuento_pkey" PRIMARY KEY ("descuento_id")
);

-- CreateTable
CREATE TABLE "Producto" (
    "producto_id" BIGSERIAL NOT NULL,
    "nombre" VARCHAR(255),
    "descripcion" TEXT,
    "precio" DOUBLE PRECISION,
    "categoria_id" BIGINT,
    "descuento_id" BIGINT,
    "activo" BOOLEAN,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("producto_id")
);

-- CreateTable
CREATE TABLE "Imagen" (
    "id" BIGSERIAL NOT NULL,
    "url" VARCHAR(255),
    "producto_id" BIGINT,
    "activo" BOOLEAN,

    CONSTRAINT "Imagen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sucursal" (
    "sucursal_id" BIGSERIAL NOT NULL,
    "nombre" VARCHAR(255),
    "direccion_id" BIGINT,
    "activo" BOOLEAN,

    CONSTRAINT "Sucursal_pkey" PRIMARY KEY ("sucursal_id")
);

-- CreateTable
CREATE TABLE "Provincia" (
    "provincia_id" BIGSERIAL NOT NULL,
    "nombre" VARCHAR(255),
    "pais_id" BIGINT,
    "activo" BOOLEAN,

    CONSTRAINT "Provincia_pkey" PRIMARY KEY ("provincia_id")
);

-- CreateTable
CREATE TABLE "Localidad" (
    "localidad_id" BIGSERIAL NOT NULL,
    "nombre" VARCHAR(255),
    "provincia_id" BIGINT,
    "activo" BOOLEAN,

    CONSTRAINT "Localidad_pkey" PRIMARY KEY ("localidad_id")
);

-- CreateTable
CREATE TABLE "Direccion" (
    "direccion_id" BIGSERIAL NOT NULL,
    "calle" VARCHAR(255),
    "numero" VARCHAR(255),
    "localidad_id" BIGINT,
    "activo" BOOLEAN,

    CONSTRAINT "Direccion_pkey" PRIMARY KEY ("direccion_id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" BIGSERIAL NOT NULL,
    "email" VARCHAR(255),
    "password" VARCHAR(255),
    "rol" VARCHAR(255),
    "activo" BOOLEAN,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductoAlergeno" (
    "id" BIGSERIAL NOT NULL,
    "producto_id" BIGINT,
    "alergeno_id" BIGINT,

    CONSTRAINT "ProductoAlergeno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockProducto" (
    "id" BIGSERIAL NOT NULL,
    "producto_id" BIGINT,
    "sucursal_id" BIGINT,
    "stock" INTEGER,
    "activo" BOOLEAN,

    CONSTRAINT "StockProducto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "Categoria"("categoria_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_descuento_id_fkey" FOREIGN KEY ("descuento_id") REFERENCES "Descuento"("descuento_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Imagen" ADD CONSTRAINT "Imagen_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "Producto"("producto_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sucursal" ADD CONSTRAINT "Sucursal_direccion_id_fkey" FOREIGN KEY ("direccion_id") REFERENCES "Direccion"("direccion_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Localidad" ADD CONSTRAINT "Localidad_provincia_id_fkey" FOREIGN KEY ("provincia_id") REFERENCES "Provincia"("provincia_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Direccion" ADD CONSTRAINT "Direccion_localidad_id_fkey" FOREIGN KEY ("localidad_id") REFERENCES "Localidad"("localidad_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductoAlergeno" ADD CONSTRAINT "ProductoAlergeno_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "Producto"("producto_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockProducto" ADD CONSTRAINT "StockProducto_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "Producto"("producto_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockProducto" ADD CONSTRAINT "StockProducto_sucursal_id_fkey" FOREIGN KEY ("sucursal_id") REFERENCES "Sucursal"("sucursal_id") ON DELETE SET NULL ON UPDATE CASCADE;

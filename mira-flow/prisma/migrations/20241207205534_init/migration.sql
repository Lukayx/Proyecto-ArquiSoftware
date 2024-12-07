-- CreateEnum
CREATE TYPE "EstadoClienteTipo" AS ENUM ('Baneado', 'NoBaneado');

-- CreateEnum
CREATE TYPE "EstadoProductoTipo" AS ENUM ('EnVenta', 'Agotado');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "Nombre" TEXT NOT NULL,
    "Email" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "idUsuario" INTEGER NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" SERIAL NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "EstadoCliente" "EstadoClienteTipo" NOT NULL,
    "Telefono" TEXT,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Producto" (
    "id" SERIAL NOT NULL,
    "EstadoProducto" "EstadoProductoTipo" NOT NULL,
    "Precio" DOUBLE PRECISION NOT NULL,
    "Descripcion" TEXT,
    "Categoria" TEXT,
    "Vendedor" INTEGER NOT NULL,
    "FechaPublicacion" TIMESTAMP(3),

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Venta" (
    "id" SERIAL NOT NULL,
    "Producto" INTEGER NOT NULL,

    CONSTRAINT "Venta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contacto" (
    "id" SERIAL NOT NULL,
    "idCliente" INTEGER NOT NULL,

    CONSTRAINT "Contacto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_Email_key" ON "Usuario"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_idUsuario_key" ON "Admin"("idUsuario");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_idUsuario_key" ON "Cliente"("idUsuario");

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_Vendedor_fkey" FOREIGN KEY ("Vendedor") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venta" ADD CONSTRAINT "Venta_Producto_fkey" FOREIGN KEY ("Producto") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contacto" ADD CONSTRAINT "Contacto_idCliente_fkey" FOREIGN KEY ("idCliente") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

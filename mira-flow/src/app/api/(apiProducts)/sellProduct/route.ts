import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export async function PUT(req: Request) {
  try {
    // Obtener el id del producto desde el cuerpo de la solicitud
    const body = await req.json();
    const { id, estadoProducto } = body;

    // Validar los datos recibidos
    if (!id || !estadoProducto) {
      return NextResponse.json(
        { error: 'El id y estadoProducto son requeridos' },
        { status: 400 }
      );
    }

    // Verificar que el nuevo estado sea 'Vendido'
    if (estadoProducto !== 'Vendido') {
      return NextResponse.json(
        { error: 'El estado debe ser "Vendido"' },
        { status: 400 }
      );
    }

    // Buscar el producto en la base de datos
    const producto = await prisma.producto.findUnique({
      where: { id },
    });

    // Verificar si el producto existe
    if (!producto) {
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 }
      );
    }

    // Actualizar el estado del producto a 'Vendido'
    const updatedProducto = await prisma.producto.update({
      where: { id },
      data: {
        EstadoProducto: 'Agotado', // Aquí se cambia el estado de 'EnVenta' a 'Vendido' o 'Agotado'
      },
    });

    // Retornar respuesta exitosa con el producto actualizado
    return NextResponse.json({
      message: 'Producto actualizado con éxito',
      producto: updatedProducto,
    });
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    return NextResponse.json(
      { error: 'Error al actualizar el producto' },
      { status: 500 }
    );
  }
}

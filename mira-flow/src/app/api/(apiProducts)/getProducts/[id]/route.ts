import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id, 10); // Obtener el id del producto de los parámetros de la ruta
    if (isNaN(id)) {
      return NextResponse.json({ error: 'El ID del producto debe ser un número válido' }, { status: 400 });
    }

    // Buscar el producto por su ID y obtener la información del cliente (Vendedor)
    const producto = await prisma.producto.findUnique({
      where: {
        id: id,
      },
      include: {
        vendedor: true, // Incluir la relación con el Cliente (vendedor)
      },
    });

    // Si no se encuentra el producto
    if (!producto) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
    }

    // Retornar el producto y la información del cliente (vendedor)
    return NextResponse.json({
      message: 'Producto obtenido con éxito',
      producto, // Producto encontrado
      // vendedor: producto.vendedor, // Información del cliente (vendedor)
    });
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    return NextResponse.json(
      { error: 'Error al obtener el producto' },
      { status: 500 }
    );
  }
}

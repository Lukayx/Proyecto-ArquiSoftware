import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export async function GET(req: Request) {
  try {
    // Obtener los precios de todos los productos
    const productos = await prisma.producto.findMany({
      select: {
        id: true, // Incluye el ID del producto (opcional, para identificación)
        Precio: true, // Incluye solo la columna "Precio"
      },
    });

    // Retornar la lista de precios en la respuesta JSON
    return NextResponse.json({
      message: 'Precios de productos obtenidos con éxito',
      productos, // Lista de productos con sus precios
    });
  } catch (error) {
    console.error('Error al obtener precios de productos:', error);
    return NextResponse.json(
      { error: 'Error al obtener precios de productos' },
      { status: 500 }
    );
  }
}


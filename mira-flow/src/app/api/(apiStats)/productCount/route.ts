import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export async function GET(req: Request) {
  try {
    // Contar los productos en la tabla Producto
    const totalProductos = await prisma.producto.count();

    // Retornar el conteo en la respuesta JSON
    return NextResponse.json({
      message: 'Conteo de productos obtenido con éxito',
      totalProductos, // Total de productos
    });
  } catch (error) {
    console.error('Error al contar productos:', error);
    return NextResponse.json(
      { error: 'Error al contar productos' },
      { status: 500 }
    );
  }
}

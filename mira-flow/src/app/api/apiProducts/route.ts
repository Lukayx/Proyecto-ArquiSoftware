import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export async function GET(req: Request) {
  try {
    // Obtener el conteo de productos
    const productosCount = await prisma.producto.count();

    // Retornar el conteo de productos en la respuesta JSON
    return NextResponse.json({
      message: 'Conteo de productos obtenido con éxito',
      productosCount, // Incluir el conteo de productos
    });
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    return NextResponse.json(
      { error: 'Error al obtener estadísticas' },
      { status: 500 }
    );
  }
}

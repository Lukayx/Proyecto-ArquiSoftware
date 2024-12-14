import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export async function GET(req: Request) {
  try {
    // Obtener todos los productos
    const productos = await prisma.producto.findMany();

    // Retornar los productos en la respuesta JSON
    return NextResponse.json({
      message: 'Productos obtenidos con éxito',
      productos, // Incluir todos los productos
    });
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return NextResponse.json(
      { error: 'Error al obtener productos' },
      { status: 500 }
    );
  }
}

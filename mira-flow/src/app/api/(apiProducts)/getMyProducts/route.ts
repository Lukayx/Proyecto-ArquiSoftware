import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export async function GET(req: Request) {
  try {
    // Obtener el token del encabezado de la solicitud
    const token = req.headers.get('authorization');
    if (!token) {
      return NextResponse.json(
        { error: 'No se proporcionó un token de autorización' },
        { status: 401 }
      );
    }

    // Convertir el token (que es el ID del usuario) a un número
    const userId = parseInt(token, 10);
    if (isNaN(userId)) {
      return NextResponse.json(
        { error: 'El token debe ser un ID de usuario válido' },
        { status: 400 }
      );
    }

    // Obtener los productos del usuario
    const productos = await prisma.producto.findMany({
      where: {
        Vendedor: userId, // Filtrar productos por el usuario vendedor
      },
    });

    // Retornar los productos encontrados
    return NextResponse.json({
      message: 'Productos obtenidos con éxito',
      productos, // Lista de productos del usuario
    });
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    return NextResponse.json(
      { error: 'Error al obtener los productos' },
      { status: 500 }
    );
  }
}

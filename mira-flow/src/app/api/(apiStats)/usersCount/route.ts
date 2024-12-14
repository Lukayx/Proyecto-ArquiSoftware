import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export async function GET(req: Request) {
  try {
    // Contar el número de usuarios en la tabla Usuario
    const totalUsuarios = await prisma.usuario.count();

    // Retornar el conteo de usuarios en la respuesta JSON
    return NextResponse.json({
      message: 'Número total de usuarios obtenido con éxito',
      totalUsuarios, // Total de usuarios
    });
  } catch (error) {
    console.error('Error al contar usuarios:', error);
    return NextResponse.json(
      { error: 'Error al contar usuarios' },
      { status: 500 }
    );
  }
}

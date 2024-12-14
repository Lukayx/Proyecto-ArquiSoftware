import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export async function GET(req: Request) {
  try {
    // Obtener todos los correos electrónicos de los usuarios
    const usuarios = await prisma.usuario.findMany({
      select: {
        Email: true,  // Solo seleccionar el campo Email
      },
    });

    // Retornar los correos electrónicos en la respuesta JSON
    return NextResponse.json({
      message: 'Correos electrónicos obtenidos con éxito',
      usuarios, // Incluir todos los correos electrónicos de usuarios
    });
  } catch (error) {
    console.error('Error al obtener los correos electrónicos:', error);
    return NextResponse.json(
      { error: 'Error al obtener los correos electrónicos' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export async function GET(req: Request, { params }: { params: { email: string } }) {
  try {
    const { email } = params; // Obtener el email desde los parámetros de la URL

    // Buscar el usuario por el correo electrónico
    const usuario = await prisma.usuario.findUnique({
      where: {
        Email: email,  // Usar el email proporcionado en la URL para buscar
      },
    });

    // Si no se encuentra el usuario
    if (!usuario) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    // Retornar el usuario encontrado en la respuesta JSON
    return NextResponse.json({
      message: 'Usuario encontrado con éxito',
    //   usuario, //esto para agregar info
    });
  } catch (error) {
    console.error('Error al obtener el usuario por email:', error);
    return NextResponse.json(
      { error: 'Error al obtener el usuario por email' },
      { status: 500 }
    );
  }
}

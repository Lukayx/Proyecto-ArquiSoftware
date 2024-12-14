import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export async function POST(req: Request) {
  try {
    // Parsear el cuerpo de la solicitud
    const body = await req.json();
    const { nombre, email } = body;

    // Validar los datos recibidos
    if (!nombre || !email) {
      return NextResponse.json(
        { error: 'Nombre y Email son requeridos' },
        { status: 400 }
      );
    }

    // Crear el usuario en la tabla Usuario
    const usuario = await prisma.usuario.create({
      data: {
        Nombre: nombre,
        Email: email,
      },
    });

    // Crear el administrador relacionado con el idUsuario recién creado
    const admin = await prisma.admin.create({
      data: {
        idUsuario: usuario.id,
      },
    });

    // Responder con éxito
    return NextResponse.json({
      message: 'Administrador creado con éxito',
      usuario,
      admin,
    });
  } catch (error) {
    console.error('Error al crear administrador:', error);
    return NextResponse.json(
      { error: 'Error al crear el administrador' },
      { status: 500 }
    );
  }
}

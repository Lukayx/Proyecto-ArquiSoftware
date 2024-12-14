import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export async function POST(req: Request) {
  try {
    // Parsear el cuerpo de la solicitud
    const body = await req.json();
    const { nombre, email, telefono } = body;

    // Validar los datos recibidos
    if (!nombre || !email || !telefono) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos: nombre, email, telefono' },
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

    // Crear el cliente en la tabla Cliente relacionado con el idUsuario
    const cliente = await prisma.cliente.create({
      data: {
        idUsuario: usuario.id,
        EstadoCliente: 'NoBaneado', // Asignar estado por defecto
        Telefono: telefono,
      },
    });

    // Responder con éxito
    return NextResponse.json({
      message: 'Cliente creado con éxito',
      usuario,
      cliente,
    });
  } catch (error) {
    console.error('Error al crear cliente:', error);
    return NextResponse.json(
      { error: 'Error al crear el cliente' },
      { status: 500 }
    );
  }
}

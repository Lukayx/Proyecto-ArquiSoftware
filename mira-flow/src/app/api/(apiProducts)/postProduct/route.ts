import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export async function POST(req: Request) {
  try {
    // Parsear el cuerpo de la solicitud
    const body = await req.json();

    const { precio, descripcion, nombre, vendedor, fechaPublicacion } = body;

    // Depuración: Mostrar los datos recibidos en el servidor
    console.log("Datos recibidos en el servidor:", body);

    // Validar los datos recibidos con validación mejorada
    if (
      precio === undefined || isNaN(precio) ||
      !descripcion?.trim() ||
      !nombre?.trim() ||
      vendedor === undefined || isNaN(vendedor) ||
      !fechaPublicacion?.trim()
    ) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos y deben ser válidos: precio, descripcion, nombre, vendedor, fechaPublicacion' },
        { status: 400 }
      );
    }

    // Crear un nuevo producto en la base de datos
    const producto = await prisma.producto.create({
      data: {
        EstadoProducto: 'EnVenta', // Asignar "EnVenta" por defecto
        Precio: parseFloat(precio),
        Descripcion: descripcion,
        Nombre: nombre,
        Vendedor: parseInt(vendedor),
        FechaPublicacion: new Date(fechaPublicacion),
      },
    });

    // Respuesta exitosa
    return NextResponse.json({
      message: 'Producto creado con éxito',
      producto,
    });
  } catch (error) {
    console.error('Error al crear producto:', error);
    return NextResponse.json(
      { error: 'Error interno al crear el producto' },
      { status: 500 }
    );
  }
}

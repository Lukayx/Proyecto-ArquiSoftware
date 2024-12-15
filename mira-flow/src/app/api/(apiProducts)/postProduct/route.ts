import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export async function POST(req: Request) {
  try {
    // Parsear el cuerpo de la solicitud
    const body = await req.json();

    const { precio, descripcion, nombre, vendedor, fechaPublicacion } = body;

    // Validar los datos recibidos
    if (!precio || !descripcion || !nombre || !vendedor || !fechaPublicacion) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos: precio, descripcion, nombre, vendedor, fechaPublicacion' },
        { status: 400 }
      );
    }

    // Crear un nuevo producto en la tabla Producto
    const producto = await prisma.producto.create({
      data: {
        EstadoProducto: 'EnVenta',  // Asignar "EnVenta" por defecto
        Precio: parseFloat(precio),
        Descripcion: descripcion,
        Nombre: nombre,
        Vendedor: parseInt(vendedor),
        FechaPublicacion: new Date(fechaPublicacion),
      },
    });

    // Retornar una respuesta exitosa
    return NextResponse.json({
      message: 'Producto creado con éxito',
      producto,
    });
  } catch (error) {
    console.error('Error al crear producto:', error);
    return NextResponse.json(
      { error: 'Error al crear el producto' },
      { status: 500 }
    );
  }
}

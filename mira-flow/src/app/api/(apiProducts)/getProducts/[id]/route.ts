import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id, 10); // Obtener el id del producto de los parámetros de la ruta
    if (isNaN(id)) {
      return NextResponse.json({ error: 'El ID del producto debe ser un número válido' }, { status: 400 });
    }

    // Buscar el producto por su ID, incluyendo la información del vendedor
    const producto = await prisma.producto.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        Nombre: true,
        Precio: true,
        Descripcion: true,
        FechaPublicacion: true,
        Vendedor: true, // Incluye el ID del vendedor (Cliente)
        vendedor: { // Hacer la relación con la tabla Cliente
          select: {
            id: true,
            Telefono: true,
            usuario: { // Relación con Usuario para obtener nombre, email y teléfono
              select: {
                Nombre: true,
                Email: true,
              },
            },
          },
        },
      },
    });

    // Si no se encuentra el producto
    if (!producto) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
    }

    // Retornar el producto con los datos completos del vendedor
    return NextResponse.json({
      message: 'Producto obtenido con éxito',
      producto: {
        id: producto.id,
        Nombre: producto.Nombre,
        Precio: producto.Precio,
        Descripcion: producto.Descripcion,
        FechaPublicacion: producto.FechaPublicacion,
      },
      vendedor: {
        id: producto.vendedor.id,
        Telefono: producto.vendedor.Telefono,
        Nombre: producto.vendedor.usuario.Nombre,
        Email: producto.vendedor.usuario.Email,
        
      },
    });
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    return NextResponse.json(
      { error: 'Error al obtener el producto' },
      { status: 500 }
    );
  }
}

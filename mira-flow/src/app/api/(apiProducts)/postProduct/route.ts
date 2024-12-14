// import { NextResponse } from 'next/server';
// import { prisma } from '@/libs/prisma';

// export async function POST(req: Request) {
//   try {
//     // Parsear el cuerpo de la solicitud
//     const body = await req.json();

//     const { estadoProducto, precio, descripcion, categoria, vendedor, fechaPublicacion } = body;

//     // Validar los datos recibidos
//     if (!estadoProducto || !precio || !descripcion || !categoria || !vendedor || !fechaPublicacion) {
//       return NextResponse.json(
//         { error: 'Todos los campos son requeridos: estadoProducto, precio, descripcion, categoria, vendedor, fechaPublicacion' },
//         { status: 400 }
//       );
//     }

//     // Crear un nuevo producto en la tabla Producto
//     const producto = await prisma.producto.create({
//       data: {
//         EstadoProducto: estadoProducto,
//         Precio: parseFloat(precio),
//         Descripcion: descripcion,
//         Categoria: categoria,
//         Vendedor: parseInt(vendedor),
//         FechaPublicacion: new Date(fechaPublicacion),
//       },
//     });

//     // Retornar una respuesta exitosa
//     return NextResponse.json({
//       message: 'Producto creado con éxito',
//       producto,
//     });
//   } catch (error) {
//     console.error('Error al crear producto:', error);
//     return NextResponse.json(
//       { error: 'Error al crear el producto' },
//       { status: 500 }
//     );
//   }
// }


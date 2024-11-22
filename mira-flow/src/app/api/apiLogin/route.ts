// import { PrismaClient } from "@prisma/client";
// import { NextResponse } from "next/server";

// const prisma = new PrismaClient();

// export const GET = async () => {
//     try {
//         // Consulta para obtener solo la columna `name`
//         const products = await prisma.product.findMany({
//             select: {
//                 name: true, // Selecciona únicamente la columna "name"
//             },
//         });

//         return NextResponse.json(products, { status: 200 });
//     } catch (error) {
//         console.error("Error fetching products:", error);
//         return NextResponse.json(
//             { error: "Failed to fetch products" },
//             { status: 500 }
//         );
//     }
// };

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async () => {
    try {
        // Consulta para obtener todos los productos con EstadoProducto "EnVenta"
        const products = await prisma.producto.findMany({
            where: {
                EstadoProducto: "EnVenta", // Filtra por estado
            },
        });

        return NextResponse.json(products, { status: 200 });
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json(
            { error: "Failed to fetch products" },
            { status: 500 }
        );
    }
};

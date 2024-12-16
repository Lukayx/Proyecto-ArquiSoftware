"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  Nombre: string;
  Descripcion: string;
  EstadoProducto: string;
}

export const useProduct = () => {
  const params = useParams(); // Obtiene los parámetros dinámicos de la URL
  const id = params.id; // Parámetro dinámico extraído
  const [product, setProduct] = useState<Product | null>(null);
  const [vendedor, setVendedor] = useState(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) return;

        const response = await fetch(
          `http://localhost:3000/api/getProducts/${id}`
        );

        if (!response.ok) {
          throw new Error("No se pudo cargar el producto.");
        }

        const data = await response.json();
        setProduct(data.producto);
        console.log(data);
      } catch (error) {
        setError("Error al cargar el producto.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, vendedor, loading, error };
};

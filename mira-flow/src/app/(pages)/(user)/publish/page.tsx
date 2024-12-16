'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function PublicarAnuncio() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [vendedor, setVendedor] = useState<string | null>(null);
  const router = useRouter();

  // Obtener el token (id del vendedor) de las cookies al cargar el componente
  useEffect(() => {
    const cookies = document.cookie.split("; ").reduce((acc: { [key: string]: string }, cookie) => {
      const [key, value] = cookie.split("=");
      acc[key] = value;
      return acc;
    }, {});
    setVendedor(cookies.user_token); // Guarda el token en el estado
  }, []);

  interface FormData {
    nombre: string;
    descripcion: string;
    precio: number;
    vendedor: number | null;
    fechaPublicacion: string;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: FormData = {
      nombre,
      descripcion,
      precio: parseFloat(precio),
      vendedor: vendedor ? parseInt(vendedor) : null, // El vendedor se obtiene del token
      fechaPublicacion: new Date().toISOString().split("T")[0], // Fecha en formato YYYY-MM-DD
    };

    console.log(data);
    if (data.vendedor) {
      try {
        const response = await fetch("http://localhost:3000/api/postProduct", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error("Error al publicar el producto");

        console.log("Producto publicado con éxito");
        router.push("/profile");
      } catch (error: any) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <h2 className={styles.formTitle}>Publicar Anuncio</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="nombre" className={styles.label}>
              Nombre del anuncio
            </label>
            <input
              type="text"
              id="nombre"
              className={styles.input}
              placeholder="Escribe el nombre del producto"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="descripcion" className={styles.label}>
              Descripción del producto
            </label>
            <textarea
              id="descripcion"
              className={styles.textarea}
              placeholder="Escribe una descripción..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            ></textarea>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="precio" className={styles.label}>
              Precio
            </label>
            <input
              type="number"
              id="precio"
              className={styles.input}
              placeholder="$0.00"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
            />
          </div>

          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.publishButton}>
              <span className={styles.icon}>+</span> Publicar Anuncio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

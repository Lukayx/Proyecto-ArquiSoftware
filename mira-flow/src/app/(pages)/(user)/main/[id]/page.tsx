"use client";

import { useProduct } from "./useProducts"; // Importa el hook
import producto from "../assets/product.png";
import styles from "./page.module.css";

export default function ProductPage() {
  const { product, loading, error } = useProduct();

  if (loading) return <div>Cargando producto...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>No se encontró el producto.</div>;

  return (
    <div className={styles.product}>
      <h1>Detalles del Producto</h1>
      <div>
        <h2>{product.Nombre}</h2>
        <p>{product.Descripcion}</p>
        <p>
          Estado: <strong>{product.EstadoProducto}</strong>
        </p>
      </div>
      <img className={styles.img} src={producto.src} />
    </div>
  );
}

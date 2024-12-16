"use client";

import { useProduct } from "./useProducts"; // Importa el hook
import producto from "../assets/product.png";
import styles from "./page.module.css";

export default function ProductPage() {
  const { product, vendedor, loading, error } = useProduct();

  if (loading) return <div>Cargando producto...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>No se encontró el producto.</div>;

  return (
    <div className={styles.container}>
      <div className={styles.product}>
        <h1>Detalles del Producto</h1>
        <div className={styles.info}>
          <h2>{product.Nombre}</h2>
          <p><strong>Descripción del producto:</strong> {product.Descripcion}</p>
          <p>
          <strong>Precio:</strong> ${product.Precio}
          </p>
        </div>
        <img className={styles.img} src={producto.src} />
      </div>
      <div className={styles.vendedor}>
        <h2>Detalles del Vendedor</h2>
        {vendedor ? (
          <>
            <p>
              <strong>Nombre:</strong> {vendedor.Nombre}
            </p>
            <p>
              <strong>Email:</strong> {vendedor.Email}
            </p>
            <p>
              <strong>Teléfono:</strong> {vendedor.Telefono}
            </p>
          </>
        ) : (
          <p>No se encontró el vendedor.</p>
        )}
      </div>
    </div>
  );
}

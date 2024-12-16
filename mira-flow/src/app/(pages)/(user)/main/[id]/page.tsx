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
          <h2>Nombre del Producto: {product.Nombre}</h2>
          <p>Descripción del producto: {product.Descripcion}</p>
          <p>
            Estado: <strong>{product.EstadoProducto}</strong>
          </p>
        </div>
        <img className={styles.img} src={producto.src} />
      </div>
      <div>
        <h2>Detalles del Vendedor</h2>
        <p>
          {/* Nombre: <strong>{vendedor.Nombre}</strong> */}
        </p>
        <p>
          {/* Email: <strong>{vendedor.Email}</strong> */}
        </p>
        <p>
          {/* Teléfono: <strong>{vendedor.Telefono}</strong> */}
        </p>
      </div>
    </div>
  );
}

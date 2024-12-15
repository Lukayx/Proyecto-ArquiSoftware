'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './page.module.css'; // Asegúrate de tener el archivo de estilos

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Simulamos un retraso de carga de 3 segundos
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Cambia el tiempo según el efecto que desees
  }, []);

  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loader}>
          <div className={styles.spinner}></div>
        </div>
      ) : (
        <div className={styles.content}>
          <h1 className={styles.title}>Bienvenido a MiraFlow</h1>
          <p className={styles.description}>
            MiraFlow es la plataforma ideal para la compra y venta de productos en
            Miraflores. Compra de manera segura y vende tus productos al mejor precio.
          </p>
          <Link href="/login">
            <button className={styles.button}>Ingresar</button>
          </Link>
        </div>
      )}
    </div>
  );
}

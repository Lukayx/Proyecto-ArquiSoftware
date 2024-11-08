import Image from "next/image";
import styles from "./page.module.css";

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

export default async function Home() {
    // await sleep(2000); // Espera 2 segundos
    // throw new Error("error Eres demasiado wap@");

  return (
    <section className={styles.container}>
      <section className={styles.section1}>
        {/* Aquí puedes agregar las cartas en filas y columnas */}
        <div className={styles.card}>Carta 1</div>
        <div className={styles.card}>Carta 2</div>
        <div className={styles.card}>Carta 3</div>
        <div className={styles.card}>Carta 4</div>
        <div className={styles.card}>Carta 5</div>
        <div className={styles.card}>Carta 6</div>
        {/* Agrega más cartas según sea necesario */}
      </section>

      <section className={styles.section2}>
        {/* Barra de búsqueda */}
        <input type="text" placeholder="Buscar..." className={styles.searchBar} />
        {/* Lista de filtros */}
        <ul className={styles.filterList}>
          <li className={styles.filterItem}>Filtro 1</li>
          <li className={styles.filterItem}>Filtro 2</li>
          <li className={styles.filterItem}>Filtro 3</li>
        </ul>
      </section>
    </section>
  );
}

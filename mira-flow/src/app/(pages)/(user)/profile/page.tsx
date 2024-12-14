import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.profileCard}>
        <div className={styles.avatar}></div>
        <div className={styles.profileInfo}>
          <h2 className={styles.name}>Juan</h2>
          <p className={styles.email}>
            <span className={styles.icon}>✉</span> correo@gmail.com
          </p>
          <p className={styles.phone}>
            <span className={styles.icon}>📞</span> +569 XXXXXXXXX
          </p>
          <p className={styles.description}>
            Descripción de Juan, ayuda nose que mas poner aquí
          </p>
        </div>
        <div className={styles.editIcon}>✏️</div>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.publishButton}>
          <span>➕</span> Publicar Anuncio
        </button>
      </div>
    </div>
  );
}

import styles from "./page.module.css";

export default function PublicarAnuncio() {
  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <h2 className={styles.formTitle}>Publicar Anuncio</h2>
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="nombre" className={styles.label}>
              Nombre del anuncio
            </label>
            <input
              type="text"
              id="nombre"
              className={styles.input}
              placeholder="Escribe el nombre del producto"
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
            ></textarea>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="precio" className={styles.label}>
              Precio
            </label>
            <input
              type="text"
              id="precio"
              className={styles.input}
              placeholder="$0.00"
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

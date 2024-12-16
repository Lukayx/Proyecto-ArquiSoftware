import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faPencilAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "./page.module.css";
import photo from "../main/assets/juan.jpg";


export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.profileCard}>
        <div className={styles.avatar}>
        <img 
            src={photo.src}
            alt="Avatar de Alberto" 
            className={styles.avatarImage} 
          />
        </div>
        <div className={styles.profileInfo}>
          <h2 className={styles.name}>Alberto</h2>
          <p className={styles.email}>
            <span className={styles.icon}>
              <FontAwesomeIcon icon={faEnvelope} />
            </span>{" "}
            correo@gmail.com
          </p>
          <p className={styles.phone}>
            <span className={styles.icon}>
              <FontAwesomeIcon icon={faPhone} />
            </span>{" "}
            +569 XXXXXXXXX
          </p>
          <p className={styles.description}>
            Descripción de Alberto, ayuda nose que mas poner aquí
          </p>
        </div>
        <div className={styles.editIcon}>
          <FontAwesomeIcon icon={faPencilAlt} />
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <a href="/publish">
          <button className={styles.publishButton}>
            <span className={styles.icon}>
              <FontAwesomeIcon icon={faPlus} />
            </span>{" "}
              Publicar Anuncio
          </button>
        </a>
      </div>
    </div>
  );
}

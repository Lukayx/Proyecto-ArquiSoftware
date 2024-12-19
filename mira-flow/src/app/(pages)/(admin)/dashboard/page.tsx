import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faChartLine } from "@fortawesome/free-solid-svg-icons";
import Nav from '../nav';

export default function Administrador() {
  return (
    <div>
    <Nav />
    <div className={styles.container}>
      <h1 className={styles.title}>ADMINISTRADOR</h1>
      <div className={styles.buttonContainer}>
        <a href="/menu">
          <div className={styles.card}>
            <FontAwesomeIcon icon={faUsers} className={styles.icon} />
            <p className={styles.text}>Usuarios</p>
          </div>
        </a>
        <a href="/profits">
          <div className={styles.card}>
            <FontAwesomeIcon icon={faChartLine} className={styles.icon} />
            <p className={styles.text}>Ganancias</p>
          </div>
        </a>
      </div>
    </div>
    </div>
  );
}

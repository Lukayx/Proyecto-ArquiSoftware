import Link from "next/link";
import styles from "./page.module.css"; // Asegúrate de que el nombre y la ruta del archivo sean correctos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingCart} from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.seccionesHeader}>
          <div className={styles.seccionesHeaderIzquierda}>
            <li>
              <h1>Miraflow</h1>
            </li>
          </div>
          <div className={styles.seccionesHeaderDerecha}>
            <li>
              <a href="/admin/dashboard">
                Mis Productos 
                <FontAwesomeIcon icon={faShoppingCart} className={styles.icon}/>
              </a>
            </li>
            <li>
              <a href="/profile">
                Perfil
                <FontAwesomeIcon icon={faUser} className={styles.icon}/>
              </a>
            </li>
          </div>
        </ul>
    </nav>
  );
};

export default Nav;


import { NextPage } from 'next'



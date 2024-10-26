import Link from "next/link";
import styles from "./page.module.css"; // Asegúrate de que el nombre y la ruta del archivo sean correctos

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li><Link href="/main" className={styles.navLink}>Home</Link></li>
        <li><Link href="/products" className={styles.navLink}>Mis productos</Link></li>
        <li><Link href="/sales" className={styles.navLink}>Ventas</Link></li>
        <li><Link href="/profile" className={styles.navLink}>Perfil</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;

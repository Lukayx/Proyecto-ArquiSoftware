import Image from "next/image";
import styles from "./page.module.css";
import logo from "./logo.jpg";

export default function Home() {
  return (
    <div className={styles.container}>
      <header>
        <ul className={styles.seccionesHeader}>
          <li>
            <Image src={logo} alt="logo" width={100} height={100} />
          </li>
          <li>
            <h1>Admin Dashboard</h1>
          </li>
          <li>
            <a href="/admin/dashboard">Dashboard</a>
          </li>
          <li>
            <a href="/admin/users">Users</a>
          </li>
          <li>
            <a href="/admin/settings">Settings</a>
          </li>
        </ul>
      </header>
    </div>
  );
}

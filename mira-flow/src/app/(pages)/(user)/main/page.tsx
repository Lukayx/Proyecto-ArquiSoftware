import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import product from "./assets/product.png"


export default function Home() {
  const products = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    name: `Producto ${i + 1}`,
    description: `Descripcion del producto ${i + 1}`,
    image: product.src,
  }));

  return (
    <div className={styles.container}>
      <main>
        <div className={styles.content}>
          <div className={styles.products}>
            {products.map((product) => (
              <div key={product.id} className={styles.product}>
                <img src={product.image} alt={product.name} />
                <div className={styles.description}>
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                </div>
              </div>
            ))}

          </div>
          <div className={styles.filters}>
            <div className={styles.searchSection}>
              <FontAwesomeIcon icon={faSearch} className={styles.icon}/>
              <input type="text" placeholder="buscar..."/>
            </div>
            <div className={styles.filterSection}>
              <h2>Filtros</h2>
              <ul>
                <li>
                  <input type="checkbox" id="hogar" />
                  <label htmlFor="hogar">Hogar</label>
                </li>
                <li>
                  <input type="checkbox" id="tecnologia" />
                  <label htmlFor="tecnologia">Tecnologia</label>
                </li>
                <li>
                  <input type="checkbox" id="ropa" />
                  <label htmlFor="ropa">Ropa</label>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <ul className={styles.seccionesFooter}>
          <li>
            <a href="/general/login">Login</a>
          </li>
          <li>
            <a href="/general/register">Register</a>
          </li>
          <li>
            <a href="/user/profile">Profile</a>
          </li>
          <li>
            <a href="/user/products">Products</a>
          </li>
        </ul>
      </footer>
    </div>
  );
}

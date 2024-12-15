"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import producto from "./assets/product.png";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/getProducts");
        const data = await response.json();
        console.log(data); // Imprime las respuestas en la consola
        setProducts(data.productos);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  

  // Calcular los productos a mostrar en la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Calcular el número total de páginas
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Función para generar las páginas visibles
  const getPagination = () => {
    const visiblePages = [];

    // Mostrar siempre la primera página
    if (currentPage > 3) visiblePages.push(1);

    // Mostrar puntos suspensivos si hay un salto
    if (currentPage > 4) visiblePages.push("...");

    // Mostrar las páginas cercanas al actual
    for (
      let i = Math.max(1, currentPage - 2);
      i <= Math.min(totalPages, currentPage + 2);
      i++
    ) {
      visiblePages.push(i);
    }

    // Mostrar puntos suspensivos si hay un salto hacia el final
    if (currentPage < totalPages - 3) visiblePages.push("...");

    // Mostrar siempre la última página
    if (currentPage < totalPages - 2) visiblePages.push(totalPages);

    return visiblePages;
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className={styles.container}>
      <main>
        <div className={styles.content}>
          <div className={styles.productsSection}>
            <div className={styles.products}>
              {currentProducts.map((product, key) => (
                <div key={key} className={styles.product}>
                  <img src={producto.src} />
                  <div className={styles.description}>
                    <h2>{product.Nombre}</h2>
                    <p>{product.Descripcion}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.pagination}>
              {/* Botón de retroceso */}
              <button
                className={styles.paginationButton}
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                {"<"}
              </button>

              {/* Números de páginas */}
              {getPagination().map((page, index) =>
                typeof page === "number" ? (
                  <button
                    key={index}
                    className={`${styles.paginationButton} ${
                      currentPage === page ? styles.active : ""
                    }`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ) : (
                  <span key={index} className={styles.paginationEllipsis}>
                    {page}
                  </span>
                )
              )}

              {/* Botón de avance */}
              <button
                className={styles.paginationButton}
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                {">"}
              </button>
            </div>
          </div>
          <div className={styles.filters}>
            <div className={styles.searchSection}>
              <FontAwesomeIcon icon={faSearch} className={styles.icon} />
              <input type="text" placeholder="buscar..." />
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
                  <label htmlFor="tecnologia">Tecnología</label>
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

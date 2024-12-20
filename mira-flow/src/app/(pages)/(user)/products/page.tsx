'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Producto from "./assets/product.png";

interface Product {
  id: number;
  Nombre: string;
  Descripcion: string;
  EstadoProducto: string;
  FechaPublicacion: string;
  Precio: number;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [vendedor, setVendedor] = useState<string | null>(null);
  const [filter, setFilter] = useState<"EnVenta" | "Agotado">("EnVenta");
  const productsPerPage = 8;
  const router = useRouter();

  useEffect(() => {
    const cookies = document.cookie.split("; ").reduce((acc: { [key: string]: string }, cookie) => {
      const [key, value] = cookie.split("=");
      acc[key] = value;
      return acc;
    }, {});
    setVendedor(cookies.user_token || null); // Guarda el token en el estado

    // console.log("Token de usuario (vendedor):", cookies.user_token);

    const fetchProducts = async () => {
      if (!vendedor) return; // Espera a que el vendedor esté disponible

      try {
        const response = await fetch("http://localhost:3000/api/getMyProducts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": vendedor || "",
          },
        });
        const data = await response.json();
        setProducts(data.productos || []); // Asegúrate de que sea un arreglo
        console.log(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [vendedor]); // Ejecuta el efecto cuando el vendedor esté disponible

  const filteredProducts = products.filter(
    (product) => product.EstadoProducto === filter
  );

  function formatDate(isoDate: string) {
    const date = new Date(isoDate); // Crear un objeto Date
    const year = date.getFullYear(); // Obtener el año
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Obtener el mes (0-11) y formatearlo a 2 dígitos
    const day = String(date.getDate()).padStart(2, '0'); // Obtener el día y formatearlo a 2 dígitos
  
    return `${year}-${month}-${day}`; // Devolver en formato YYYY-MM-DD
  }
  
  // Calcular los productos a mostrar en la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Calcular el número total de páginas
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

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

  const handleProductClick = (id: number) => {
    router.push(`/main/${id}`);
  };

  const handleProductSell = async (id: number, estadoProducto: string) => {
    try {
      const response = await fetch("http://localhost:3000/api/sellProduct", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": vendedor || "",
        },
        body: JSON.stringify({ id , estadoProducto: "Agotado"}),
      });
      response.ok ? console.log("El estado del producto cambió con éxito") : console.error("Error cambiando el estado del producto");
      
    } catch (error) {
      console.error("Error selling product:", error);
    }

  }

  return (
    <div className={styles.container}>
      <main>
        <div className={styles.content}>
          <div className={styles.filterButtons}>
            <button
              className={`${styles.filterButton} ${filter === "EnVenta" ? styles.active : ""}`}
              onClick={() => setFilter("EnVenta")}
            >
              <span>En Venta</span>
            </button>
            <button
              className={`${styles.filterButton} ${filter === "Agotado" ? styles.active : ""}`}
              onClick={() => setFilter("Agotado")}
            >
              <span>Agotado</span>
            </button>
          </div>
          <div className={styles.productsSection}>
            <div className={styles.products}>
              {currentProducts.length === 0 ? (
                <h1>No has publicado ningún producto</h1>
              ) : (



                <div className={styles.products}>
                  {currentProducts.map((product) => (
                    <div key={product.id} className={styles.product}>
                      <img src={Producto.src} alt={product.Nombre} />
                      <div className={styles.description}>
                        <h2>{product.Nombre}</h2>
                        {/* <p>{product.Descripcion}</p> */}
                        <p>Precio: {product.Precio}</p>
                        <p>Fecha Publicación: {formatDate(product.FechaPublicacion)}</p>
                      </div>
                      <button className={styles.btn} onClick={() => handleProductClick(product.id)}>EDITAR</button>
                      <button className={styles.btn} onClick={() => handleProductSell(product.id, product.EstadoProducto)}>Agotado</button>
                    </div>
                  ))}
                </div>

              )}
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
        </div>
      </main>
      <footer>
        {/* Aquí puedes agregar contenido para el pie de página */}
      </footer>
    </div>
  );
}
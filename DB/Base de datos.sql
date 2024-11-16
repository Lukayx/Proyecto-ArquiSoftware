-- Tabla Usuario
CREATE TABLE Usuario (
    id SERIAL PRIMARY KEY,
    Nombre VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL UNIQUE
);

-- Crear tipo ENUM para EstadoCliente
CREATE TYPE EstadoClienteTipo AS ENUM ('Baneado', 'NoBaneado');

-- Crear tipo ENUM para EstadoProducto
CREATE TYPE EstadoProductoTipo AS ENUM ('EnVenta', 'Agotado');

-- Tabla Admin
CREATE TABLE Admin (
    id SERIAL PRIMARY KEY,
    idUsuario INT NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(id)
);

-- Tabla Cliente
CREATE TABLE Cliente (
    id SERIAL PRIMARY KEY,
    idUsuario INT NOT NULL,
    EstadoCliente EstadoClienteTipo NOT NULL,
    Telefono VARCHAR(15),
    FOREIGN KEY (idUsuario) REFERENCES Usuario(id)
);

-- Tabla Producto
CREATE TABLE Producto (
    id SERIAL PRIMARY KEY,
    EstadoProducto EstadoProductoTipo NOT NULL,
    Precio FLOAT NOT NULL,
    Descripcion TEXT,
    Categoria VARCHAR(255),
    Vendedor INT NOT NULL,
    FechaPublicacion DATE,
    FOREIGN KEY (Vendedor) REFERENCES Cliente(id)
);

-- Tabla Venta
CREATE TABLE Venta (
    id SERIAL PRIMARY KEY,
    Producto INT NOT NULL,
    FOREIGN KEY (Producto) REFERENCES Producto(id)
);

-- Tabla Contacto
CREATE TABLE Contacto (
    id SERIAL PRIMARY KEY,
    idCliente INT NOT NULL,
    FOREIGN KEY (idCliente) REFERENCES Cliente(id)
);

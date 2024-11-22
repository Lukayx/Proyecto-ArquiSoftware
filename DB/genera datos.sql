-- Insertar datos en la tabla `usuario`
INSERT INTO usuario ( nombre, email) VALUES
    ('Juan Pérez', 'juan.perez@example.com'),
    ('Ana López', 'ana.lopez@example.com'),
    ('Carlos Ruiz', 'carlos.ruiz@example.com'),
    ('María Gómez', 'maria.gomez@example.com'),
    ('Luis Fernández', 'luis.fernandez@example.com'),
    ('Elena Sánchez', 'elena.sanchez@example.com');

-- Insertar datos en la tabla `cliente`
-- Solo los usuarios 1, 2 y 3 serán clientes
INSERT INTO cliente (id_usuario, estadocliente, telefono) VALUES
    (1, 'NoBaneado', '56934567890'),
    (2, 'Baneado', '56987654321'),
    (3, 'NoBaneado', '56923344554'),
    (6, 'NoBaneado', '56927483910');

-- Insertar datos en la tabla `admin`
-- Solo los usuarios 4, 5 y 6 serán administradores
INSERT INTO admin (id_usuario) VALUES
    (4),
    (5);

-- Insertar datos en la tabla `producto`
-- Solo se pueden asignar productos a los clientes existentes
INSERT INTO producto (id_cliente, estadoproducto, precio, descripcion, categoria, fechapublicacion) VALUES
    (1, 'EnVenta', 250.00, 'Cámara Fotográfica', 'Electrónica', '2024-11-22'),
    (1, 'Agotado', 150.00, 'Bicicleta Montaña', 'Deportes', '2024-11-21'),
    (4, 'EnVenta', 75.50, 'Juego de Herramientas', 'Hogar', '2024-11-20'),
    (3, 'Agotado', 300.00, 'Teléfono Móvil', 'Electrónica', '2024-11-19'),
    (3, 'EnVenta', 120.00, 'Mesa de Oficina', 'Muebles', '2024-11-18');
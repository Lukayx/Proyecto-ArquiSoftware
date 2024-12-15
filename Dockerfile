# Etapa 1: Construcción de la aplicación
FROM node:16 AS builder

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el package.json desde el subdirectorio 'src' (ajustar la ruta según la ubicación real)
COPY src/package*.json ./

# Verificar si los archivos fueron copiados correctamente
RUN ls -al /app

# Instalar las dependencias
RUN npm install

# Copiar el resto del código al contenedor
COPY . .

# Construir la aplicación
RUN npm run build

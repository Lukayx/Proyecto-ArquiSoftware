# Etapa 1: Construcción de la aplicación
FROM node:18 AS builder

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos package.json y package-lock.json desde la raíz del proyecto
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código del proyecto (desde la raíz y subcarpetas)
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa 2: Servir la aplicación
FROM node:18

WORKDIR /app

# Copiar el código construido desde la etapa anterior
COPY --from=builder /app /app

# Instalar un servidor minimalista para producción
RUN npm install next

EXPOSE 3000

CMD ["npm", "start"]

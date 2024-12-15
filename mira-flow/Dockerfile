# Etapa 1: Construcción
FROM node:18 AS builder

# Directorio de trabajo en el contenedor
WORKDIR /app

# Copiar package.json y package-lock.json (si existe) para instalar dependencias primero
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa 2: Servir la aplicación
FROM node:18 AS runner

# Directorio de trabajo para la etapa de producción
WORKDIR /app

# Copiar solo los archivos necesarios desde la etapa anterior
COPY --from=builder /app /app

# Exponer el puerto en el que Next.js servirá la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación en producción
CMD ["npm", "start"]

# Etapa 1: Construcción de la aplicación
FROM node:16 AS builder

WORKDIR /app

# Copiar package.json y package-lock.json primero
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código y construir el proyecto
COPY . .
RUN npm run build

# Etapa 2: Servir la aplicación
FROM node:16

WORKDIR /app

# Copiar la aplicación construida
COPY --from=builder /app /app

# Instalar el servidor minimalista para producción
RUN npm install next

EXPOSE 3000

CMD ["npm", "start"]

# Etapa 1: Construcción de la aplicación
FROM node:16 AS builder

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json al contenedor
COPY package*.json ./

# Verificar si los archivos fueron copiados correctamente (para depuración)
RUN ls -al /app

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto del código del proyecto al contenedor
COPY . .

# Construir la aplicación (si es necesario)
RUN npm run build

# Etapa 2: Servir la aplicación
FROM node:16

# Establecer el directorio de trabajo para la etapa de ejecución
WORKDIR /app

# Copiar los archivos construidos desde la etapa de construcción
COPY --from=builder /app /app

# Instalar las dependencias necesarias para producción
RUN npm install --only=production

# Exponer el puerto en el que la aplicación se ejecutará
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]

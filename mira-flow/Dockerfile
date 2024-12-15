# Etapa 1: Construcción
FROM node:18 AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia el archivo de dependencias
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Ejecuta prisma generate para generar el cliente Prisma
RUN npx prisma generate

# Construye la aplicación Next.js
RUN npm run build

# Etapa 2: Producción
FROM node:18 AS runner

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios de la etapa de construcción
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/prisma ./prisma

# Configura el puerto de la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación en producción
CMD ["npm", "run", "start"]

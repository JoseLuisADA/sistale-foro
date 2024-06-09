# Etapa de construcción
FROM node:18.20.0 AS builder

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia el package.json y el package-lock.json
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Compila la aplicación Next.js
RUN npm run build

# Etapa de producción
FROM node:18.20.0

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos compilados desde la etapa de construcción
COPY --from=builder /usr/src/app ./

# Instala las dependencias de producción (si es necesario)
RUN npm install --only=production

# Expone el puerto que tu aplicación utilizará
EXPOSE 3000

# Comando para iniciar la aplicación en modo producción
CMD [ "npm", "start" ]
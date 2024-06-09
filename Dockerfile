# Usa una imagen oficial de Node.js como imagen base
FROM node:18.20.0

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia el package.json y el package-lock.json
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto que tu aplicación utilizará
EXPOSE 8080

# Comando para iniciar la aplicación
CMD [ "npm", "start" ]

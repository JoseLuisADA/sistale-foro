# Utiliza la última imagen base de Node.js
FROM node:latest

# Crea el directorio de la aplicación y establece los permisos
RUN mkdir -p /usr/src/app && chown -R node:node /usr/src/app

# Define el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de la aplicación y establece los permisos
COPY package*.json ./
RUN chown node:node package*.json

# Instala las dependencias como el usuario adecuado
USER node
RUN npm install

# Copia el resto del código de la aplicación
COPY --chown=node:node . .

# Exponer el puerto
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]

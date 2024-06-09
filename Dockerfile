# Usar la imagen oficial de Node.js como base
FROM node:latest

# Establecer el directorio de trabajo
WORKDIR ./

# Copiar el package.json y el package-lock.json
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Exponer el puerto que tu aplicación utiliza
EXPOSE 3000

# Comando para iniciar la aplicación
CMD [ "npm", "start" ]

# Usamos la imagen base de Node.js
FROM node:latest

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiamos los archivos del proyecto al contenedor
COPY package*.json ./

# Instalamos las dependencias de Node.js
RUN npm install

# Copiamos el resto de los archivos del proyecto al contenedor
COPY . .

# Exponemos el puerto que la aplicación va a usar
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "index.js"]

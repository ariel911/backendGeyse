// ESTAN TODAS LAS CONSTANTES DE LA API EN ESTE ARCHIVO

require('dotenv').config() // importar dotenv para obtener las variables de entorno

module.exports = {
    PORT: process.env.PORT || 10000, // obtener el puerto de la aplicación desde el archivo .env o si no existe, usar el puerto 5000
    DB_NAME: process.env.DB_NAME,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    MAX_FILE_SIZE: 1024 * 1024 * 20, 
    JWT_SECRET: process.env.JWT_SECRET  
}
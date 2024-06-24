// importo el archivo de constantes globales
const globalConstants = require('../../const/globalConstants')

module.exports = {

  "development": {
    "username": globalConstants.DB_USERNAME,
    "password": globalConstants.DB_PASSWORD,
    "host": globalConstants.DB_HOST,
    "database": globalConstants.DB_NAME,
    "dialect": "postgres"
  }
  

}
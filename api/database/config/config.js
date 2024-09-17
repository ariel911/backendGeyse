// importo el archivo de constantes globales
const globalConstants = require('../../const/globalConstants')

module.exports = {
  development: {
    username: globalConstants.DB_USERNAME,
    password: globalConstants.DB_PASSWORD,
    database: globalConstants.DB_NAME,
    host: globalConstants.DB_HOST,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true, // Para servidores en la nube que requieren SSL
        rejectUnauthorized: false
      }
    }
  }
};
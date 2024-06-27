'use strict';
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

//agregado
/* const process = require('process');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const globalConstants = require('../../const/globalConstants') */

require('dotenv').config();

const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME, PORT } = process.env;
const db = {};

//agregado
/* let sequelize
sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD,config)
 */

const sequelize = new Sequelize(
  `postgresql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${PORT}/${DB_NAME}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);



fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

sequelize.sync()

module.exports = db;

'use strict';

const models = require('../models/index'); // Importa los modelos

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Inserta en la tabla 'tipo'
    await Promise.all([
      models.tipo.findOrCreate({
        where: { id: 1 },
        defaults: {
          nombre_tipo: 'PQS',
          estado: 1, // Activo
        }
      }),
      models.tipo.findOrCreate({
        where: { id: 2 },
        defaults: {
          nombre_tipo: 'CO2',
          estado: 1, // Activo
        }
      }),
      models.tipo.findOrCreate({
        where: { id: 3 },
        defaults: {
          nombre_tipo: 'K',
          estado: 1, // Activo
        }
      }),
      models.tipo.findOrCreate({
        where: { id: 4 },
        defaults: {
          nombre_tipo: 'H2O',
          estado: 1, // Activo
        }
      }),
      models.tipo.findOrCreate({
        where: { id: 5 },
        defaults: {
          nombre_tipo: 'AFFF',
          estado: 1, // Activo
        }
      }),
      models.tipo.findOrCreate({
        where: { id: 6 },
        defaults: {
          nombre_tipo: 'HCFC',
          estado: 1, // Activo
        }
      }),
      models.tipo.findOrCreate({
        where: { id: 7 },
        defaults: {
          nombre_tipo: 'PQS',
          estado: 1, // Activo
        }
      })
    ]);

  
  },
};

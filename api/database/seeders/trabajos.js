'use strict';

const models = require('../models/index'); // Importa los modelos

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Inserta en la tabla 'trabajo'
    await Promise.all([
      models.trabajo.findOrCreate({
        where: { id: 1 },
        defaults: {
          nombre_trabajo: 'Nuevo',
          estado: 1, // Activo
        }
      }),
      models.trabajo.findOrCreate({
        where: { id: 2 },
        defaults: {
          nombre_trabajo: 'Mantenimiento',
          estado: 1, // Activo
        }
      }),
      models.trabajo.findOrCreate({
        where: { id: 3 },
        defaults: {
          nombre_trabajo: 'Recarga',
          estado: 1, // Activo
        }
      }),
      models.trabajo.findOrCreate({
        where: { id: 4 },
        defaults: {
          nombre_trabajo: 'Prueba Hidrostatica',
          estado: 1, // Activo
        }
      }),
      models.trabajo.findOrCreate({
        where: { id: 5 },
        defaults: {
          nombre_trabajo: 'Otro',
          estado: 1, // Activo
        }
      }),
      models.trabajo.findOrCreate({
        where: { id: 6 },
        defaults: {
          nombre_trabajo: 'Ninguno',
          estado: 1, // Activo
        }
      })
    ]);
  },

};

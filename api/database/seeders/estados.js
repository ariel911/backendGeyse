'use strict';

const models = require('../models/index'); // Importa los modelos

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Inserta en la tabla 'estado'
    await Promise.all([
      models.estado.findOrCreate({
        where: { id: 1 },
        defaults: {
          nombre_estado: 'Cilindro',
          estado: 1, // Activo
        }
      }),
      models.estado.findOrCreate({
        where: { id: 2 },
        defaults: {
          nombre_estado: 'Pintura',
          estado: 1, // Activo
        }
      }),
      models.estado.findOrCreate({
        where: { id: 3 },
        defaults: {
          nombre_estado: 'Tarjeta',
          estado: 1, // Activo
        }
      }),
      models.estado.findOrCreate({
        where: { id: 4 },
        defaults: {
          nombre_estado: 'Válvula',
          estado: 1, // Activo
        }
      }),
      models.estado.findOrCreate({
        where: { id: 5 },
        defaults: {
          nombre_estado: 'Manguera',
          estado: 1, // Activo
        }
      }),
      models.estado.findOrCreate({
        where: { id: 6 },
        defaults: {
          nombre_estado: 'Manómetro',
          estado: 1, // Activo
        }
      }),
      models.estado.findOrCreate({
        where: { id: 7 },
        defaults: {
          nombre_estado: 'Ubicación',
          estado: 1, // Activo
        }
      }),
      models.estado.findOrCreate({
        where: { id: 8 },
        defaults: {
          nombre_estado: 'Señalización',
          estado: 1, // Activo
        }
      }),
      models.estado.findOrCreate({
        where: { id: 9 },
        defaults: {
          nombre_estado: 'No operable',
          estado: 1, // Activo
        }
      }),
      models.estado.findOrCreate({
        where: { id: 10 },
        defaults: {
          nombre_estado: 'No vigente',
          estado: 1, // Activo
        }
      }),
      models.estado.findOrCreate({
        where: { id: 11 },
        defaults: {
          nombre_estado: 'Ninguno',
          estado: 1, // Activo
        }
      })
    ]);
  },

};

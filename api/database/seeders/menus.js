'use strict';

const models = require('../models/index'); // Importa los modelos

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Inserta en la tabla 'menu'
    await Promise.all([
      models.menu.findOrCreate({
        where: { id: 1 },
        defaults: {
          nombre_menu: 'Todo',
          estado: 1, // Activo
        }
      }),
      models.menu.findOrCreate({
        where: { id: 2 },
        defaults: {
          nombre_menu: 'Usuarios',
          estado: 1, // Activo
        }
      }),
      models.menu.findOrCreate({
        where: { id: 3 },
        defaults: {
          nombre_menu: 'Cargos',
          estado: 1, // Activo
        }
      }),
      models.menu.findOrCreate({
        where: { id: 4 },
        defaults: {
          nombre_menu: 'Clientes',
          estado: 1, // Activo
        }
      }),
      models.menu.findOrCreate({
        where: { id: 5 },
        defaults: {
          nombre_menu: 'Sucursales',
          estado: 1, // Activo
        }
      }),
      models.menu.findOrCreate({
        where: { id: 6 },
        defaults: {
          nombre_menu: 'Servicios',
          estado: 1, // Activo
        }
      }),
      models.menu.findOrCreate({
        where: { id: 7 },
        defaults: {
          nombre_menu: 'Inspecciones',
          estado: 1, // Activo
        }
      }),
      models.menu.findOrCreate({
        where: { id: 8 },
        defaults: {
          nombre_menu: 'Extintores',
          estado: 1, // Activo
        }
      }),
      models.menu.findOrCreate({
        where: { id: 9 },
        defaults: {
          nombre_menu: 'Reportes',
          estado: 1, // Activo
        }
      }),
    ]);
  },
};

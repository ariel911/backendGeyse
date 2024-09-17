'use strict';

const models = require("../models/index");
const { encrypt } = require('../../helpers/handleBcrypt'); // Importa la función de encriptación

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      models.usuario.findOrCreate({
        where: {
          id: "1"
        },
        defaults: {
          nombre_usuario: "Sebastian",
          apellido: "Bejarano",
          correo: "sebas@example.com",
          clave: await encrypt("75457842"), // Encripta la clave
          fecha_registro: new Date(),
          estado: 1,
          rolId: 1 // Asocia el rol correspondiente
        }
      }),
    ]);
  },
};

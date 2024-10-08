
const models = require("../database/models/index");
const { encrypt } = require('../helpers/handleBcrypt')
module.exports = {

  listar: async (req, res) => {
    try {
      const clientes = await models.cliente.findAll({
        model: models.cliente,
        attributes: ['id', 'nombre_cliente', 'usuario_acceso', 'clave', 'codigo', "estado", 'nombre_encargado', 'fecha_registro'],
      });
      res.json({
        success: true,
        data: {
          clientes: clientes
        }
      });
    } catch (error) {
      console.error(error);
      res.json({
        success: false,
        data: {
          message: "Ha ocurrido un error al obtener la lista de clientes"
        }
      });
    }
  },

  crear: async (req, res) => {
    try {
      const { nombre_cliente, usuario_acceso, fecha_registro, clave, codigo, estado, nombre_encargado } = req.body;

      const cliente = await models.cliente.create({
        nombre_cliente, usuario_acceso, clave, codigo, estado, fecha_registro, nombre_encargado
      });

      res.status(201).json({
        success: true,
        data: cliente
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: 'Ha ocurrido un error al crear el cliente'
      });
    }
  },

  darBaja: async (req, res) => {
    try {
      const cliente = await models.cliente.findByPk(req.params.id);
      if (cliente) {
        await cliente.update(req.body);
      }
      res.json({
        success: true,
        data: {
          message: `El cliente con id ${cliente.id} ha sido actualizado exitosamente`
        }
      });
    } catch (error) {
      console.error(error);
      res.json({
        success: false,
        data: {
          message: 'Ha ocurrido un error al actualizar el cliente'
        }
      });
    }
  },
  actualizar: async (req, res) => {
    try {
      const clienteId = req.params.id; // Obtén el ID del cliente a actualizar
      const { nombre_cliente, usuario_acceso, clave, codigo, estado, nombre_encargado } = req.body;

      // Busca el cliente por ID
      const cliente = await models.cliente.findByPk(clienteId);
      if (!cliente) {
        return res.status(404).json({
          success: false,
          message: `Cliente con id ${clienteId} no encontrado`
        });
      }

      // Actualiza el cliente con los nuevos datos
      await cliente.update({
        nombre_cliente,
        usuario_acceso,
        clave, // Si estás usando un método para encriptar la clave, deberías hacerlo aquí
        codigo,
        estado,
        nombre_encargado
      });

      res.json({
        success: true,
        data: {
          message: `El cliente con id ${cliente.id} ha sido actualizado exitosamente`,
          cliente // Puedes devolver el cliente actualizado si lo deseas
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Ha ocurrido un error al actualizar el cliente'
      });
    }
  }



}
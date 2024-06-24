// FUNCIONAMIENTO DE TODAS LAS RUTAS DE estadoES

const models = require("../database/models/index");

module.exports = {
  listar: async (req, res) => {
    try {
      const estado = await models.estado.findAll({
        model: models.estado,
        attributes: ['id', 'nombre_estado', 'estado'],
      });
      res.json({
        success: true,
        data: {
          estado: estado
        }
      });
    } catch (error) {
      console.error(error);
      res.json({
        success: false,
        data: {
          message: "Ha ocurrido un error al obtener la lista de estadoes"
        }
      });
    }
  },
  crear: async (req, res) => {
    try {
      const { nombre_estado, estado } = req.body;

      const estadoE = await models.estado.create({
        nombre_estado,
        estado,
      });

      res.status(201).json({
        success: true,
        data: estadoE
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: 'Ha ocurrido un error al crear el estado'
      });
    }
  },

  
  eliminar: async (req, res) => {
    try {
      const estado = await models.estado.findByPk(req.params.id);
      if (estado) {
        await estado.destroy();
        res.json({
          success: true,
          data: {
            message: `El estado con id ${estado.id} ha sido eliminado exitosamente`
          }
        });
      } else {
        res.json({
          success: false,
          data: {
            message: "No se encontró ningún estado con el ID proporcionado"
          }
        });
      }
    } catch (error) {
      console.error(error);
      res.json({
        success: false,
        data: {
          message: "Ha ocurrido un error al eliminar el estado"
        }
      });
    }
  },
  darBaja: async (req, res) => {
    try {
      const estado = await models.estado.findByPk(req.params.id);


      if (estado) {
        await estado.update(req.body);
      }

      res.json({
        success: true,
        data: {
          message: `El estado con id ${estado.id} ha sido actualizado exitosamente`
        }
      });

    } catch (error) {
      console.error(error);
      res.json({
        success: false,
        data: {
          message: 'Ha ocurrido un error al actualizar el estado'
        }
      });
    }
  },
}
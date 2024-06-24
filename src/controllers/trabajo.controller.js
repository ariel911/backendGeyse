// FUNCIONAMIENTO DE TODAS LAS RUTAS DE trabajoES

const models = require("../database/models/index");

module.exports = {
  listar: async (req, res) => {
    try {
      const trabajo = await models.trabajo.findAll({
        model: models.trabajo,
        attributes: ['id', 'nombre_trabajo', 'estado'],
      });
      res.json({
        success: true,
        data: {
          trabajo: trabajo
        }
      });
    } catch (error) {
      console.error(error);
      res.json({
        success: false,
        data: {
          message: "Ha ocurrido un error al obtener la lista de trabajoes"
        }
      });
    }
  },
  crear: async (req, res) => {
    try {
      const { nombre_trabajo, estado } = req.body;

      const trabajo = await models.trabajo.create({
        nombre_trabajo,
        estado,
      });

      res.status(201).json({
        success: true,
        data: trabajo
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: 'Ha ocurrido un error al crear el trabajo'
      });
    }
  },

  
  eliminar: async (req, res) => {
    try {
      const trabajo = await models.trabajo.findByPk(req.params.id);
      if (trabajo) {
        await trabajo.destroy();
        res.json({
          success: true,
          data: {
            message: `El trabajo con id ${trabajo.id} ha sido eliminado exitosamente`
          }
        });
      } else {
        res.json({
          success: false,
          data: {
            message: "No se encontró ningún trabajo con el ID proporcionado"
          }
        });
      }
    } catch (error) {
      console.error(error);
      res.json({
        success: false,
        data: {
          message: "Ha ocurrido un error al eliminar el trabajo"
        }
      });
    }
  },
  darBaja: async (req, res) => {
    try {
      const trabajo = await models.trabajo.findByPk(req.params.id);


      if (trabajo) {
        await trabajo.update(req.body);
      }

      res.json({
        success: true,
        data: {
          message: `El trabajo con id ${trabajo.id} ha sido actualizado exitosamente`
        }
      });

    } catch (error) {
      console.error(error);
      res.json({
        success: false,
        data: {
          message: 'Ha ocurrido un error al actualizar el trabajo'
        }
      });
    }
  },
}
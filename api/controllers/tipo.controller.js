// FUNCIONAMIENTO DE TODAS LAS RUTAS DE tipoES

const models = require("../database/models/index");

module.exports = {
  listar: async (req, res) => {
    try {
      const tipo = await models.tipo.findAll({
        model: models.tipo,
        attributes: ['id', 'nombre_tipo', 'estado'],
      });
      res.json({
        success: true,
        data: {
          tipo: tipo
        }
      });
    } catch (error) {
      console.error(error);
      res.json({
        success: false,
        data: {
          message: "Ha ocurrido un error al obtener la lista de tipoes"
        }
      });
    }
  },
  crear: async (req, res) => {
    try {
      const { nombre_tipo, estado } = req.body;

      const tipo = await models.tipo.create({
        nombre_tipo,
        estado,
      });

      res.status(201).json({
        success: true,
        data: tipo
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: 'Ha ocurrido un error al crear el tipo'
      });
    }
  },
  actualizar: async (req, res) => {
    try {
      const { id } = req.params; // Obtener el ID del registro a actualizar desde los parámetros de la URL
      const { nombre_tipo, estado } = req.body; // Datos que se desean actualizar

      // Buscar el registro por ID
      const tipo = await models.tipo.findByPk(id);

      // Verificar si el registro existe
      if (!tipo) {
        return res.status(404).json({
          success: false,
          error: 'El tipo no fue encontrado'
        });
      }

      // Actualizar el registro con los nuevos datos
      await tipo.update({
        nombre_tipo,
        estado,
      });

      // Respuesta exitosa con los datos actualizados
      res.status(200).json({
        success: true,
        data: tipo
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: 'Ha ocurrido un error al actualizar el tipo'
      });
    }
  }
  ,
  eliminar: async (req, res) => {
    try {
      const tipo = await models.tipo.findByPk(req.params.id);
      if (tipo) {
        await tipo.destroy();
        res.json({
          success: true,
          data: {
            message: `El tipo con id ${tipo.id} ha sido eliminado exitosamente`
          }
        });
      } else {
        res.json({
          success: false,
          data: {
            message: "No se encontró ningún tipo con el ID proporcionado"
          }
        });
      }
    } catch (error) {
      console.error(error);
      res.json({
        success: false,
        data: {
          message: "Ha ocurrido un error al eliminar el tipo"
        }
      });
    }
  },
  darBaja: async (req, res) => {
    try {
      const tipo = await models.tipo.findByPk(req.params.id);


      if (tipo) {
        await tipo.update(req.body);
      }

      res.json({
        success: true,
        data: {
          message: `El tipo con id ${tipo.id} ha sido actualizado exitosamente`
        }
      });

    } catch (error) {
      console.error(error);
      res.json({
        success: false,
        data: {
          message: 'Ha ocurrido un error al actualizar el tipo'
        }
      });
    }
  },
}
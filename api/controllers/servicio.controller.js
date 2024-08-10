// FUNCIONAMIENTO DE TODAS LAS RUTAS DE servicio

const models = require("../database/models/index");

module.exports = {
  listar: async (req, res) => {
    try {
      const servicio = await models.servicio.findAll({
        model: models.servicio,
        attributes: ['id', 'observaciones', 'estado','fecha_servicio','proximo_ph','proximo_mantenimiento'],
        include:[
          {
            model:models.servicio_trabajo,
            attributes: ['trabajoId','servicioId'],
            include:[{
              model:models.trabajo,
              attributes: ['id','nombre_trabajo','estado'],
            }]
          },
          {
            model:models.usuario,
            attributes: ['id','nombre_usuario','apellido','estado','correo'],
          },
          {
            model:models.extintor,
            attributes: ['id','marca','ubicacion','capacidad','fecha_registro','estado','codigo_extintor','codigo_empresa','observaciones'],
            include:[{
              model:models.sucursal,
              attributes: ['id','nombre_sucursal','nombre_encargado','ubicacion','codigo','fecha_registro','estado'],
              include:[{
                model:models.cliente,
                attributes: ['id','nombre_cliente','nombre_encargado','codigo','fecha_registro','estado'],
              }]
            }]
          }
        ]
      });
      res.json({
        success: true,
        data: {
          servicio: servicio
        }
      });
    } catch (error) {
      console.error(error);
      res.json({
        success: false,
        data: {
          message: "Ha ocurrido un error al obtener la lista de servicioes"
        }
      });
    }
  },
  crear: async (req, res) => {
    try {
      const servicio = await models.servicio.create(req.body);
    
      // Crear las relaciones muchos a muchos con los autores
      
      if (req.body.trabajos && Array.isArray(req.body.trabajos)) {
        for (const trabajoId of req.body.trabajos) {
          
          await models.servicio_trabajo.create({
            servicioId: servicio.id,
            trabajoId: trabajoId
          });
        }
      }

      res.status(201).json({
        success: true,
        data: servicio
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: 'Ha ocurrido un error al crear el servicio'
      });
    }
  },
  eliminar: async (req, res) => {
    try {
      const servicio = await models.servicio.findByPk(req.params.id);
      if (servicio) {
        await servicio.destroy();
        res.json({
          success: true,
          data: {
            message: `El servicio con id ${servicio.id} ha sido eliminado exitosamente`
          }
        });
      } else {
        res.json({
          success: false,
          data: {
            message: "No se encontró ninguna servicio con el ID proporcionado"
          }
        });
      }
    } catch (error) {
      console.error(error);
      res.json({
        success: false,
        data: {
          message: "Ha ocurrido un error al eliminar la servicio"
        }
      });
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params.id; // Suponiendo que el ID del servicio a actualizar se pasa en los parámetros de la solicitud
      const { trabajos, ...datosActualizados } = req.body; // Suponiendo que 'menus' es una propiedad que contiene la lista de menús asociados al servicio
  
      // Actualizar el servicio
      const [actualizados] = await models.servicio.update(datosActualizados, {
        where: { id }
      });
  
      // Verificar si se ha actualizado algún servicio
      
      if (actualizados === 0 && !trabajos) {
        return res.status(404).json({
          success: false,
          error: 'La servicio especificada no existe'
        });
      }
  
      // Eliminar todas las relaciones existentes entre el servicio y los menús
      if(!!trabajos){
        await models.servicio_trabajo.destroy({
          where: { servicioId: id }
        });
      }
      
  
      // Crear las nuevas relaciones muchos a muchos con los menús actualizados
      if (trabajos && Array.isArray(trabajos)) {
        for (const trabajoId of trabajos) {
          await models.servicio_trabajo.create({
            servicioId: id,
            trabajoId
          });
        }
      }
  
      // Obtener el servicio actualizado
      const servicioActualizado = await models.servicio.findByPk(id);
  
      // Responder con el resultado
      res.status(200).json({
        success: true,
        data: servicioActualizado
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: 'Ha ocurrido un error al actualizar la servicio'
      });
    }
  },
  
  darBaja: async (req, res) => {
    try {
      const servicio = await models.servicio.findByPk(req.params.id);


      if (servicio) {
        await servicio.update(req.body);
      }

      res.json({
        success: true,
        data: {
          message: `La servicio con id ${servicio.id} ha sido actualizado exitosamente`
        }
      });

    } catch (error) {
      console.error(error);
      res.json({
        success: false,
        data: {
          message: 'Ha ocurrido un error al actualizar la servicio'
        }
      });
    }
  },
}
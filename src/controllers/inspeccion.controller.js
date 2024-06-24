// FUNCIONAMIENTO DE TODAS LAS RUTAS DE inspecion

const models = require("../database/models/index");

module.exports = {
  listar: async (req, res) => {
    try {
      const inspeccion = await models.inspeccion.findAll({
        model: models.inspeccion,
        attributes: ['id', 'observaciones', 'estado','fecha_inspeccion'],
        include:[
          {
            model:models.inspeccion_estado,
            attributes: ['estadoId','inspeccionId'],
            include:[{
              model:models.estado,
              attributes: ['id','nombre_estado','estado'],
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
                attributes: ['id','nombre_cliente','nombre_encargado','ubicacion','codigo','fecha_registro','estado'],
              }]
            }]
          }
        ]
      });
      res.json({
        success: true,
        data: {
          inspecion: inspeccion
        }
      });
    } catch (error) {
      console.error(error);
      res.json({
        success: false,
        data: {
          message: "Ha ocurrido un error al obtener la lista de inspecciones"
        }
      });
    }
  },
  crear: async (req, res) => {
    try {
      const inspeccion = await models.inspeccion.create(req.body);
    
      // Crear las relaciones muchos a muchos con los autores
      
      if (req.body.estados && Array.isArray(req.body.estados)) {
        for (const estadoId of req.body.estados) {
          
          await models.inspeccion_estado.create({
            inspeccionId: inspeccion.id,
            estadoId: estadoId
          });
        }
      }

      res.status(201).json({
        success: true,
        data: inspeccion
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: 'Ha ocurrido un error al crear el inspecion'
      });
    }
  },
  eliminar: async (req, res) => {
    try {
      const inspeccion = await models.inspeccion.findByPk(req.params.id);
      if (inspeccion) {
        await inspeccion.destroy();
        res.json({
          success: true,
          data: {
            message: `El inspeccion con id ${inspeccion.id} ha sido eliminado exitosamente`
          }
        });
      } else {
        res.json({
          success: false,
          data: {
            message: "No se encontró ninguna inspeccion con el ID proporcionado"
          }
        });
      }
    } catch (error) {
      console.error(error);
      res.json({
        success: false,
        data: {
          message: "Ha ocurrido un error al eliminar la inspeccion"
        }
      });
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params.id; // Suponiendo que el ID del inspecion a actualizar se pasa en los parámetros de la solicitud
      const { estados, ...datosActualizados } = req.body; // Suponiendo que 'menus' es una propiedad que contiene la lista de menús asociados al inspecion
  
      // Actualizar el inspecion
      const [actualizados] = await models.inspeccion.update(datosActualizados, {
        where: { id }
      });
  
      // Verificar si se ha actualizado algún inspecion
      
      if (actualizados === 0 && !estados) {
        return res.status(404).json({
          success: false,
          error: 'La inspeccion especificada no existe'
        });
      }
  
      // Eliminar todas las relaciones existentes entre el inspecion y los menús
      if(!!estados){
        await models.inspeccion_estado.destroy({
          where: { inspeccionId: id }
        });
      }
      
  
      // Crear las nuevas relaciones muchos a muchos con los menús actualizados
      if (estados && Array.isArray(estados)) {
        for (const estadoId of estados) {
          await models.inspeccion_estado.create({
            inspeccionId: id,
            estadoId
          });
        }
      }
  
      // Obtener el inspecion actualizado
      const inspeccionActualizado = await models.inspeccion.findByPk(id);
  
      // Responder con el resultado
      res.status(200).json({
        success: true,
        data: inspeccionActualizado
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: 'Ha ocurrido un error al actualizar la inspeccion'
      });
    }
  },
  
  darBaja: async (req, res) => {
    try {
      const inspeccion = await models.inspeccion.findByPk(req.params.id);


      if (inspeccion) {
        await inspeccion.update(req.body);
      }

      res.json({
        success: true,
        data: {
          message: `La inspeccion con id ${inspeccion.id} ha sido actualizado exitosamente`
        }
      });

    } catch (error) {
      console.error(error);
      res.json({
        success: false,
        data: {
          message: 'Ha ocurrido un error al actualizar la inspeccion'
        }
      });
    }
  },
}
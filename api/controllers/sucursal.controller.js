// FUNCIONAMIENTO DE TODAS LAS RUTAS DE sucursalES

const models = require("../database/models/index");

module.exports = {
  listar: async (req, res) => {
    try {
      const sucursal = await models.sucursal.findAll({
        model: models.sucursal,
        attributes: ['id', 'nombre_sucursal','nombre_encargado','ubicacion','codigo','fecha_registro','estado'],
        include:[
          {
            model:models.cliente,
            attributes: ['id','nombre_cliente','nombre_encargado','estado'],
            
          }
        ]
      });
      res.json({
        success: true,
        data: {
          sucursal: sucursal
        }
      });
    } catch (error) {
      console.error(error);
      res.json({
        success: false,
        data: {
          message: "Ha ocurrido un error al obtener la lista de sucursales"
        }
      });
    }
  },
  
  crear: async (req, res) => {
    try {
      const {nombre_encargado,nombre_sucursal,ubicacion,fecha_registro,codigo, estado, clienteId } = req.body;
      

      const sucursal = await models.sucursal.create({
        nombre_sucursal,
        nombre_encargado,
        ubicacion,
        codigo,
        estado,
        fecha_registro,
        clienteId, // Asocia el usuario con un rol
      });

      res.status(201).json({
        success: true,
        data: sucursal
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: 'Ha ocurrido un error al crear el sucursal'
      });
    }
  },
    // 
    update: async (req, res) => {
        const sucursalId = req.params.id; // Suponiendo que el ID del usuario a actualizar se pasa como parte de la URL.
        const { nombre_sucursal,nombre_encargado,ubicacion,fecha_registro, codigo, clienteId } = req.body;
        
    
        try {
          // Busca el sucursal que se va a actualizar
          const sucursal = await models.sucursal.findByPk(sucursalId);
    
          if (!sucursal) {
            return res.json({
              success: false,
              data: {
                message: "sucursal no encontrado"
              }
            });
          }
    
          // Actualiza los campos del usuario
          sucursal.nombre_sucursal = nombre_sucursal;
          sucursal.nombre_encargado = nombre_encargado;
          sucursal.codigo = codigo;
          sucursal.ubicacion = ubicacion;
          sucursal.fecha_registro = fecha_registro
          sucursal.clienteId=clienteId;
    
    
          // Guarda los cambios en la base de datos
          await sucursal.save();
    
          res.json({
            success: true,
            data: {
              sucursal,
              // Si también deseas enviar información sobre los préstamos actualizados, puedes hacerlo aquí.
            }
          });
        } catch (error) {
          console.error(error);
          res.json({
            success: false,
            data: {
              message: "Ha ocurrido un error al actualizar el sucursal"
            }
          });
        }
      },
  
  darBaja: async (req, res) => {
    try {
      const sucursal = await models.sucursal.findByPk(req.params.id);


      if (sucursal) {
        await sucursal.update(req.body);
      }

      res.json({
        success: true,
        data: {
          message: `El sucursal con id ${sucursal.id} ha sido actualizado exitosamente`
        }
      });

    } catch (error) {
      console.error(error);
      res.json({
        success: false,
        data: {
          message: 'Ha ocurrido un error al actualizar el sucursal'
        }
      });
    }
  },
}
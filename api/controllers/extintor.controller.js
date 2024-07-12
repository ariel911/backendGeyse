const models = require("../database/models/index");

module.exports = {
  listar: async (req, res) => {
    try {
      const extintor = await models.extintor.findAll({
        attributes: ['id', 'marca', 'ubicacion', 'capacidad', 'fecha_registro', 'estado', 'codigo_extintor', 'codigo_empresa', 'observaciones'],
        include: [
          {
            model: models.tipo,
            attributes: ['nombre_tipo', 'estado'],
          },
          {
            model: models.sucursal,
            attributes: ['nombre_sucursal', 'nombre_encargado', 'ubicacion', 'codigo', 'fecha_registro', 'estado'],
            include: [
              {
                model: models.cliente,
                attributes: ['nombre_cliente', 'nombre_encargado', 'ubicacion', 'fecha_registro', 'estado', 'codigo'],
              }
            ]
          },
          {
            model: models.usuario,
            attributes: ['nombre_usuario', 'apellido', 'correo', 'fecha_registro', 'estado'],
          }
        ]
      });
      res.json({
        success: true,
        data: {
          extintor: extintor
        }
      });
    } catch (error) {
      console.error(error);
      res.json({
        success: false,
        data: {
          message: "Ha ocurrido un error al obtener la lista de extintores"
        }
      });
    }
  },
  
  crear: async (req, res) => {
    try {
      const {observaciones, capacidad, marca, ubicacion, fecha_registro, codigo_extintor, codigo_empresa, estado, tipoId, sucursalId, usuarioId } = req.body;

      const extintor = await models.extintor.create({
        observaciones,
        capacidad,
        marca,
        ubicacion,
        fecha_registro,
        codigo_extintor,
        codigo_empresa,
        estado,
        tipoId,
        sucursalId,
        usuarioId 
      });

      res.status(201).json({
        success: true,
        data: extintor
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: 'Ha ocurrido un error al crear el extintor'
      });
    }
  },
  
  update: async (req, res) => {
    const extintorId = req.params.id;
    const { marca, ubicacion, capacidad, fecha_registro, estado, codigo_extintor, codigo_empresa, observaciones, tipoId, sucursalId, usuarioId } = req.body;

    try {
      const extintor = await models.extintor.findByPk(extintorId);

      if (!extintor) {
        return res.json({
          success: false,
          data: {
            message: "extintor no encontrado"
          }
        });
      }

      extintor.marca = marca;
      extintor.ubicacion = ubicacion;
      extintor.capacidad = capacidad;
      extintor.fecha_registro = fecha_registro;
      extintor.estado = estado;
      extintor.codigo_extintor = codigo_extintor;
      extintor.codigo_empresa = codigo_empresa;
      extintor.observaciones = observaciones;
      extintor.tipoId = tipoId;
      extintor.sucursalId = sucursalId;
      extintor.usuarioId = usuarioId;

      await extintor.save();

      res.json({
        success: true,
        data: {
          extintor,
        }
      });
    } catch (error) {
      console.error(error);
      res.json({
        success: false,
        data: {
          message: "Ha ocurrido un error al actualizar el extintor"
        }
      });
    }
  },

  darBaja: async (req, res) => {
    try {
      const extintor = await models.extintor.findByPk(req.params.id);

      if (extintor) {
        await extintor.update(req.body);
      }

      res.json({
        success: true,
        data: {
          message: `El extintor con id ${extintor.id} ha sido actualizado exitosamente`
        }
      });

    } catch (error) {
      console.error(error);
      res.json({
        success: false,
        data: {
          message: 'Ha ocurrido un error al actualizar el extintor'
        }
      });
    }
  },

  buscarPorId: async (req, res) => {
    try {
      const extintor = await models.extintor.findByPk(req.params.id, {
        attributes: ['id', 'marca', 'ubicacion', 'capacidad', 'fecha_registro', 'estado', 'codigo_extintor', 'codigo_empresa', 'observaciones'],
        include: [
          {
            model: models.tipo,
            attributes: ['nombre_tipo', 'estado'],
          },
          {
            model: models.sucursal,
            attributes: ['nombre_sucursal', 'nombre_encargado', 'ubicacion', 'codigo', 'fecha_registro', 'estado'],
            include: [
              {
                model: models.cliente,
                attributes: ['nombre_cliente', 'nombre_encargado', 'ubicacion', 'fecha_registro', 'estado', 'codigo'],
              }
            ]
          },
          {
            model: models.usuario,
            attributes: ['nombre_usuario', 'apellido', 'correo', 'fecha_registro', 'estado'],
          }
        ]
      });

      if (extintor) {
        res.json({
          success: true,
          data: extintor
        });
      } else {
        res.json({
          success: false,
          data: {
            message: `No se encontró un extintor con el id ${req.params.id}`
          }
        });
      }
    } catch (error) {
      console.error(error);
      res.json({
        success: false,
        data: {
          message: 'Ha ocurrido un error al buscar el extintor'
        }
      });
    }
  },
}

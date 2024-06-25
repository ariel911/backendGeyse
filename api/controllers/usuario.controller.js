// FUNCIONAMIENTO DE TODAS LAS RUTAS DE USUARIO

const models = require("../database/models/index");

const { encrypt } = require('../helpers/handleBcrypt')
module.exports = {

  listar: async (req, res) => {
    try {
      const usuarios = await models.usuario.findAll({
        model: models.usuario,
        attributes: ['id', 'nombre_usuario','apellido','correo', 'clave', 'estado','fecha_registro'],
        include: [{
          model: models.rol,
          attributes: ['id', 'nombre_rol'],
          include:[
            {
              model:models.menu_rol,
              attributes: ['menuId','rolId'],
              include:[{
                model:models.menu,
                attributes: ['id','nombre_menu'],
              }]
            }
          ]
        }]
        ,
      });
      res.json({
        success: true,
        data: {
          usuarios: usuarios
        }
      });
    } catch (error) {
      console.error(error);
      res.json({
        success: false,
        data: {
          message: "Ha ocurrido un error al obtener la lista de usuarios"
        }
      });
    }
  },

  crear: async (req, res) => {
    try {
      const { nombre_usuario,apellido, correo, estado, clave,fecha_registro, rolId } = req.body;
      const passwordHash = await encrypt(clave)

      const usuario = await models.usuario.create({
        nombre_usuario,
        correo,
        apellido,
        clave: passwordHash,
        estado,
        fecha_registro,
        rolId, // Asocia el usuario con un rol
      });

      res.status(201).json({
        success: true,
        data: usuario
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: 'Ha ocurrido un error al crear el usuario'
      });
    }
  },

  // 
  update: async (req, res) => {
    const userId = req.params.id; // Suponiendo que el ID del usuario a actualizar se pasa como parte de la URL.
    const { nombre_usuario,apellido,fecha_registro, correo, rolId } = req.body;
    const passwordHash = await encrypt(req.body.clave)

    try {
      // Busca el usuario que se va a actualizar
      const usuario = await models.usuario.findByPk(userId);

      if (!usuario) {
        return res.json({
          success: false,
          data: {
            message: "Usuario no encontrado"
          }
        });
      }

      // Actualiza los campos del usuario
      usuario.nombre_usuario = nombre_usuario;
      usuario.correo = correo;
      usuario.apellido = apellido;
      usuario.fecha_registro = fecha_registro
      usuario.clave = passwordHash;
      usuario.rolId=rolId;


      // Guarda los cambios en la base de datos
      await usuario.save();

      res.json({
        success: true,
        data: {
          usuario,
          // Si también deseas enviar información sobre los préstamos actualizados, puedes hacerlo aquí.
        }
      });
    } catch (error) {
      console.error(error);
      res.json({
        success: false,
        data: {
          message: "Ha ocurrido un error al actualizar el usuario"
        }
      });
    }
  },
  darBaja: async (req, res) => {
    try {
      const usuario = await models.usuario.findByPk(req.params.id);


      if (usuario) {
        await usuario.update(req.body);
      }

      res.json({
        success: true,
        data: {
          message: `El usuario con id ${usuario.id} ha sido actualizado exitosamente`
        }
      });

    } catch (error) {
      console.error(error);
      res.json({
        success: false,
        data: {
          message: 'Ha ocurrido un error al actualizar el usuario'
        }
      });
    }
  },
  


}
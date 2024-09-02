const models = require("../database/models/index")

const bcrypt = require('bcryptjs') // para encriptar la contraseña

const signJWT = require('../middlewares/signJWT') // para crear el token
const { encrypt } = require('../helpers/handleBcrypt')

module.exports = {

    login: async (req, res, next) => {
        try {
            // 1. Verifico que el usuario exista solo comparando con el email
            const user = await models.usuario.findOne({
                include: [{
                    model: models.rol,
                    attributes: ['id', 'nombre_rol']
                }],
                where: {
                    correo: req.body.correo
                }
            });

            var contraseniaCoincide = false;
            if (user) {  // Si existe el usuario
                // 2. Verifico que la contraseña sea correcta
                contraseniaCoincide = await bcrypt.compareSync(req.body.clave, user.clave);
                // Comparo la contraseña ingresada con la contraseña de la base de datos
            }

            // 3. Verifico que el usuario esté activo
            if (!user || !contraseniaCoincide || user.estado !== 1) {
                return res.status(500).json({
                    success: false,
                    error: 'usuario o contraseña incorrecta'
                });
            }

            // 4. Si todo está bien, devuelvo el token
            res.json({
                success: true,
                data: {
                    token: signJWT(user,"usuario"), // Creo el token con los datos del usuario
                    usuario: user
                }
            });
        } catch (err) {
            return next(err);
        }
    }
    ,
    loginCliente: async (req, res, next) => {
        try {
            // 1. Verifico que el cliente exista solo comparando con usuario_acceso
            const cliente = await models.cliente.findOne({
                where: {
                    usuario_acceso: req.body.usuario_acceso
                }
            });
            var contraseniaCoincide = false;
            if (cliente) {

                // 2. Comparo la contraseña ingresada con la contraseña de la base de datos (sin encriptar)
                contraseniaCoincide = cliente && cliente.clave === req.body.clave;
            }
            // 3. Verifico que el cliente esté activo
            if (!cliente || !contraseniaCoincide || cliente.estado !== 1) {
                return res.status(401).json({
                    success: false,
                    error: 'usuario o contraseña incorrecta'
                });
            }

            // 4. Si todo está bien, devuelvo el token
            res.json({
                success: true,
                data: {
                    token: signJWT(cliente,"cliente"), // Crear el token con los datos del cliente
                    cliente: cliente
                }
            });
        } catch (err) {
            return next(err);
        }
    }
    ,
    acces: async (req, res, next) => {
        try {
            // 1. Verifico que el usuario exista solo comparando con el email
            const user = await models.usuario.findOne({
                where: {
                    correo: req.body.correo
                }
            })
            var contraseniaCoincide = false
            if (user) {  // Si existe el usuario
                // 2. Verifico que la contraseña sea correcta
                contraseniaCoincide = await bcrypt.compareSync(req.body.clave, user.clave)
                // Comparo la contraseña ingresada con la contraseña de la base de datos
            }
            if (!user || !contraseniaCoincide) {
                return res.status(500).json({
                    success: false,
                    error: 'usuario o contraseña incorrecta'
                });
            }
            res.json({
                success: true,
                data: {
                    id: user.id,
                    nombre: user.nombre,

                    correo: user.correo,
                }
            })

        } catch (err) {
            return next(err)
        }
    },
    registrarse: async (req, res, next) => {


        const claveHash = await encrypt(req.body.clave)
        const registerUser = await models.usuario.create({
            correo: req.body.correo,
            apellido: req.body.apellido,
            nombre: req.body.nombre,
            clave: claveHash,
            ci: req.body.ci,
            telefono: req.body.telefono,
            direccion: req.body.direccion,
            fecha_registro: req.body.fecha_registro,

        })
        const relacion = await models.usuario_roles.create({
            usuarioId: registerUser.id,
            rolId: req.body.rolId

        })

        res.send({ data: registerUser })


    }

}
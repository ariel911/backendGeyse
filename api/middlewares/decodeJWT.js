const jwt = require('jsonwebtoken');
const models = require('../database/models/index');
const moment = require('moment');
const globalConstants = require('../const/globalConstants');

module.exports = async function (req, res, next) {

    if (req.header('Authorization') && req.header('Authorization').split(' ').length > 1) {
        try {
            // Verifico el token y lo decodifico
            let dataToken = jwt.verify(req.header('Authorization').split(' ')[1], globalConstants.JWT_SECRET);

            if (dataToken.exp <= moment().unix()) {
                return res.status(500).json({
                    success: false,
                    error: 'El token expiró'
                });
            }

            res.locals.token = dataToken;
           
            let usuario;
            if (dataToken.tipo === 'usuario') {
                // Buscar al usuario por ID
                usuario = await models.usuario.findOne({
                    where: {
                        id: dataToken.id
                    }
                });
            } else if (dataToken.tipo === 'cliente') {
                // Buscar al cliente por ID
                usuario = await models.cliente.findOne({
                    where: {
                        id: dataToken.id
                    }
                });
            }

            if (!usuario) {
                return res.status(500).json({
                    success: false,
                    error: 'Usuario o cliente no autorizado'
                });
            }

            res.locals.usuario = usuario; // Guardar el usuario/cliente en locals para usar en rutas

            next(); // Si todo está bien, pasar al siguiente middleware o controlador

        } catch (err) {
            return res.status(500).json({
                success: false,
                error: 'Sesión expirada'
            });
        }

    } else {
        return res.status(500).json({
            success: false,
            error: 'Usuario o cliente no autorizados'
        });
    }

};

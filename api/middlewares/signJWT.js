const jwt = require('jsonwebtoken'); // para crear el token
const globalConstants = require('../const/globalConstants');

module.exports = function (usuario, tipo) { // recibe el usuario por parámetro y el tipo (por defecto 'usuario')

    if (usuario) {

        // Se crea el token con los datos del usuario y el tipo de entidad (usuario o cliente)
        const token = jwt.sign({
            id: usuario.id,
            tipo: tipo, // 'usuario' o 'cliente'
            nombre: usuario.nombre_cliente || usuario.nombre_usuario // Incluir nombre si es posible, considerando campos de cliente y usuario
        },
            globalConstants.JWT_SECRET, // clave secreta para encriptar el token
            {
                expiresIn: '1h' // expira en 1 hora
            }
        );
        return token; // devuelvo el token
    } else {
        return null; // si no hay usuario, devuelvo null
    }
};

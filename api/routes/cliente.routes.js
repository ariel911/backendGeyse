// RUTAS DE clienteS

const router = require("express").Router(); // importar express.Router()

const clienteController = require('../controllers/cliente.controller') // importar el archivo de controladores de clientes

router.get('/', clienteController.listar)
router.post('/', clienteController.crear)
router.put('/:id', clienteController.actualizar)
router.put('/baja/:id', clienteController.darBaja)


module.exports = router;
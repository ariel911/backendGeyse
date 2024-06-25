// RUTAS DE clienteS

const router = require("express").Router(); // importar express.Router()

const estadoController = require('../controllers/estado.controller') // importar el archivo de controladores de clientes

router.get('/', estadoController.listar)
router.post('/', estadoController.crear)
router.put('/:id', estadoController.darBaja)
router.put('/baja/:id', estadoController.darBaja)


module.exports = router;
// RUTAS DE clienteS

const router = require("express").Router(); // importar express.Router()

const trabajoController = require('../controllers/trabajo.controller') // importar el archivo de controladores de trabajo

router.get('/', trabajoController.listar)
router.post('/', trabajoController.crear)
router.put('/:id', trabajoController.darBaja)
router.put('/baja/:id', trabajoController.darBaja)


module.exports = router;
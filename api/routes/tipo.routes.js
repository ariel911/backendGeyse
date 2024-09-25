// RUTAS DE clienteS

const router = require("express").Router(); // importar express.Router()

const tipoController = require('../controllers/tipo.controller') // importar el archivo de controladores de tipo

router.get('/', tipoController.listar)
router.post('/', tipoController.crear)
router.put('/:id', tipoController.darBaja)
router.put('/baja/:id', tipoController.darBaja)
router.put('/:id', tipoController.actualizar)


module.exports = router;
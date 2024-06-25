// RUTAS DE inspecciones

const router = require("express").Router(); // importar express.Router()

const inspeccionController = require('../controllers/inspeccion.controller') // importar el archivo de controladores de inspeccion

router.get('/', inspeccionController.listar)
router.post('/', inspeccionController.crear)
router.put('/:id', inspeccionController.update)
router.put('/baja/:id', inspeccionController.darBaja)


module.exports = router;
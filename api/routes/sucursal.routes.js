// RUTAS DE clienteS

const router = require("express").Router(); // importar express.Router()

const sucursalController = require('../controllers/sucursal.controller') // importar el archivo de controladores de sucursal

router.get('/', sucursalController.listar)
router.post('/', sucursalController.crear)
router.put('/:id', sucursalController.darBaja)
router.put('/baja/:id', sucursalController.darBaja)


module.exports = router;
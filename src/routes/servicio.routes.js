// RUTAS DE servicioes

const router = require("express").Router(); // importar express.Router()

const servicioController = require('../controllers/servicio.controller') // importar el archivo de controladores de servicio

router.get('/', servicioController.listar)
router.post('/', servicioController.crear)
router.put('/:id', servicioController.update)
router.put('/baja/:id', servicioController.darBaja)


module.exports = router;
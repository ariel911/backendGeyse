// RUTAS DE clienteS

const router = require("express").Router(); // importar express.Router()

const extintorController = require('../controllers/extintor.controller') // importar el archivo de controladores de extintor

router.get('/', extintorController.listar)
router.post('/', extintorController.crear)
router.put('/:id', extintorController.darBaja)
router.put('/baja/:id', extintorController.darBaja)


module.exports = router;
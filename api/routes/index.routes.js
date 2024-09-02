// SE ENCARGA DE CONECTAR TODAS LAS RUTAS

const { Router } = require("express") // importar express
//const decodeJWT = require("./middlewares/decodeJWT.js")
const authRoutes = require("./auth.routes")

const usuarioRoutes = require("./usuario.routes") // importar el archivo de rutas de usuarios
const rolRoutes = require("./rol.routes") 

const clienteRoutes = require("./cliente.routes") // importar el archivo de cliente
const menuRoutes = require("./menu.routes") // importar el archivo de menu
const estadoRoutes = require("./estado.routes") // importar el archivo de estado
const trabajoRoutes = require("./trabajo.routes") // importar el archivo de estado
const tipoRoutes = require("./tipo.routes") 
const sucursalRoutes = require("./sucursal.routes") 
const extintorRoutes = require("./extintor.routes") 
const inspeccionRoutes = require("./inspeccion.routes") 
const servicioRoutes = require("./servicio.routes") 

const decodeJWT =require("../middlewares/decodeJWT")


const rutas_init = () => { // aca se ponen todas las rutas que existen
  const router = Router() // crear una instancia de express.Router()
 
  router.use("/usuarios",decodeJWT, usuarioRoutes) // para acceder a las rutas de usuarios de la api siempre deberá empezar con /usuarios
  router.use("/cliente", decodeJWT,clienteRoutes) 
  router.use("/menu", decodeJWT,menuRoutes) 
  router.use("/estado",decodeJWT, estadoRoutes) 
  router.use("/trabajo",decodeJWT, trabajoRoutes) 
  router.use("/tipo",decodeJWT,tipoRoutes) 
  router.use("/rol",decodeJWT, rolRoutes) 
  router.use("/sucursal",decodeJWT, sucursalRoutes) 
  router.use("/extintor",decodeJWT, extintorRoutes) 
  router.use("/inspeccion",decodeJWT, inspeccionRoutes) 
  router.use("/servicio",decodeJWT, servicioRoutes) 




  return router // retornar el router
};
const rutas_auth = () => {
  const router = Router()
  router.use("/auth", authRoutes)
  return router
}
/* const ruta_reserva = () => {
  const router = Router()
  router.use("/reserva", reservaRoutes)
  return router
} */
/* const ruta_acceso=()=>{
  const router = Router()
  router.use("/acceso", accesRoutes)
  return router
} */
module.exports = { rutas_init,rutas_auth} // exportar el archivo de rutas de la api
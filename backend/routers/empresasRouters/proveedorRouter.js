import { Router } from "express";
import { convenioController } from "../../controllers/empresasController/proveedor/convenios.js";
import { proveedorController } from "../../controllers/empresasController/proveedor/proveedor.js";

const router = Router()

router.get('/registro', proveedorController.proveedorGet)
router.post('/registro', proveedorController.proveedorPost)
router.post('/ramaNegocio', proveedorController.ramaNegocioPost)

router.get('/convenio/registro', convenioController.proveedorGet)
router.get('/convenio/registro/asocRegional', convenioController.asociacionRegGet)
router.post('/convenio/registro/catalogoProd', convenioController.catalogoProdPost)
router.post('/convenio/registro', convenioController.convenioPost)
router.get('/convenio/cancelar', convenioController.cancelarConvenioGet)
router.post('/convenio/cancelar', convenioController.cancelarConvenioPost)


export const proveedorRouter = router
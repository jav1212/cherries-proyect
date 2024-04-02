import { contratoController } from "../controllers/contratos/contratosController.js";
import { Router } from "express"

const router = Router()

router.post('/detalleContrato/cultivosproductora', contratoController.getCultivosProductoraPost)
router.post('/registrar', contratoController.contratoPost)
router.post('/verificacionregistro', contratoController.verificarEmpresasPost)
router.post('/detalleContrato/registrar', contratoController.detalleContratoPost)
router.post('/envio', contratoController.getContratosProductora)
router.post('/envio/detallesContrato', contratoController.getDetallesContPost)
router.post('/envio/registro', contratoController.envioPost)

export const contratosRouter = router
import { Router } from "express";
import { beneficiosController } from "../../controllers/mantenimiento/beneficiosController.js";

const router = Router()

router.get('/listaproveedores',beneficiosController.getProveedores)
router.post('/listaconveniosprod',beneficiosController.getConveniosProdPost)
router.post('/listaconveniosasoc',beneficiosController.getConveniosAsoPost)
router.post('/registrarbeneficios',beneficiosController.beneficioPost)

export const beneficiosRouter = router
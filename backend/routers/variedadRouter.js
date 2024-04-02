import { Router } from "express";
import { variedadController } from "../controllers/variedadController.js";

const router = Router()

router.get('/registrar', variedadController.variedadPaisesGet)
router.get('', variedadController.variedadesGet)
router.post('/registrar', variedadController.variedadPost)
router.get('/registrarPrecio', variedadController.precioVariedadGet)
router.post('/precioActual', variedadController.precioVarActualGet)
router.post('/registrarPrecio', variedadController.precioVariedadPost)
router.post('/cancelarPrecio', variedadController.cancelarPrecioPost)

export const variedadRouter = router

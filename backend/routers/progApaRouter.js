import { Router } from "express";
import { progApaController } from "../controllers/progApaController.js";

const router = Router()

router.post('/registrarPersona', progApaController.personaPost)
router.get('/registrar', progApaController.progApaGet)
router.post('/registrar/variedad', progApaController.variedadPost)
router.post('/registrar', progApaController.progApaPost)
router.post('/cancelar/productora', progApaController.productoraGet)
router.post('/cancelar/persona', progApaController.cancelarProgApaPerPost)
router.post('/cancelar/variedad', progApaController.cancelarProgApaCrzPost)
router.post('/cancelar', progApaController.cancelarProgApaPost)

export const progApaRouter = router
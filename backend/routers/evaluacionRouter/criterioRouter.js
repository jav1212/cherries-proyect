import { Router } from "express";
import { criterioController } from "../../controllers/evaluacion/criterioController.js";

const router = Router()

router.post('/registrarcriterio',criterioController.criterioPost)

export const criterioRouter = router
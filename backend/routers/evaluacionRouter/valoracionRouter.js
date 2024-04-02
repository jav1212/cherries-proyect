import { Router } from "express";
import { valoracionController } from "../../controllers/evaluacion/valoracionController.js";

const router = Router()

router.post('/registrarvaloracion',valoracionController.valoracionPost)

export const valoracionRouter = router
import { Router } from "express";
import { unidadController } from "../../controllers/recetas/unidadController.js";

const router = Router()

router.post('/registrarunidad',unidadController.unidadPost)

export const unidadRouter = router
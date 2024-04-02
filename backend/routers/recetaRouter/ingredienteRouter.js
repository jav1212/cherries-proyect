import { Router } from "express";
import { ingredienteController } from "../../controllers/recetas/ingredienteController.js";

const router = Router()

router.post('/registraringrediente',ingredienteController.ingredientePost)

export const ingredienteRouter = router
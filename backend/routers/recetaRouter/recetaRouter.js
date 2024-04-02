import { Router } from "express";
import { recetaController } from "../../controllers/recetas/recetaController.js";

const router = Router()

router.get('/listaingredientes',recetaController.ingredientesGet)
router.post('',recetaController.recetaPost)

export const recetasRouter = router

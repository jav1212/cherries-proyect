import { Router } from "express";
import { evalAnualController } from "../../controllers/evaluacion/evalAnualController.js";

const router = Router()

router.get('/listaclientes', evalAnualController.clientesEvaluacionGet)
router.post('/listaproductoras',evalAnualController.productorasContratoPost)
router.post('/listadetalles',evalAnualController.getDetallesContratoPost)

export const evalAnualRouter = router
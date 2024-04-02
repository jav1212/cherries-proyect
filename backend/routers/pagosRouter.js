import { Router } from "express";
import { pagosController } from "../controllers/pagosController.js";

const router = Router()

router.post('/formapago/registro', pagosController.formaPagoPost)
router.post('/empresasProductoras', pagosController.getProductorasPost)
router.post('/registro', pagosController.registrarPagoPost)
router.post('/formaspago/productora', pagosController.getFormasPagoPost)
export const pagosRouter = router
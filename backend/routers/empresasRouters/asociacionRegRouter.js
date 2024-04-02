import { Router } from "express"
import { asocRegController } from "../../controllers/empresasController/asociacionReg.js"

const router = Router()

router.post('', asocRegController.asociacionesRegGet)
router.post('/registro', asocRegController.asociacionesRegPost)

export const asocRegRouter = router
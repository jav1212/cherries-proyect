import { Router } from "express"
import { asocRegRouter } from "./empresasRouters/asociacionRegRouter.js"
import { clienteRouter } from "./empresasRouters/clienteRouter.js"
import { productoraRouter } from "./empresasRouters/productoraRouter.js"
import { proveedorRouter } from "./empresasRouters/proveedorRouter.js"

const router = Router()

router.use('/productora', productoraRouter)
router.use('/proveedor', proveedorRouter)
router.use('/asociacionRegional', asocRegRouter)
router.use('/cliente', clienteRouter)

export const empresasRouters = router

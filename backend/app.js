import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
import { lugarRouter } from './routers/lugarRouter.js'
import { variedadRouter } from './routers/variedadRouter.js'
import { progApaRouter } from './routers/progApaRouter.js'
import { empresasRouters } from './routers/empresasRouters.js'
import { pagosRouter } from './routers/pagosRouter.js'
import { evalAnualRouter } from './routers/evaluaciones/evaluacionAnualRouter.js'
import { contratosRouter } from './routers/contratosRouter.js'

//esto hay que acomodarlo luego
//import { evalAnualRouter } from './routers/evaluacionRouter/evaluacionAnualRouter.js';

//javier evaluacion
import { criterioRouter } from './routers/evaluacionRouter/criterioRouter.js';
import { valoracionRouter } from './routers/evaluacionRouter/valoracionRouter.js';

//javier recetas
import { unidadRouter } from './routers/recetaRouter/unidadRouter.js'
import { ingredienteRouter } from './routers/recetaRouter/ingredienteRouter.js'
import { recetasRouter } from './routers/recetaRouter/recetaRouter.js'

//javier mantenimiento
import { beneficiosRouter } from './routers/mantenimientoRouter/beneficiosRouter.js'

const app = express();

//settings
app.set('port',3001)

//middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json({ type : 'application/json' }))

//incorporar rutas
app.use('/api/lugar', lugarRouter)
app.use('/api/variedad', variedadRouter)
app.use('/api/empresas', empresasRouters)
app.use('/api/apadrinamientos', progApaRouter)
app.use('/api/pagos', pagosRouter)
app.use('/api/evaluacion',evalAnualRouter)
app.use('/api/contratos', contratosRouter)

//esto hay que acomodarlo luego
//app.use('/api/evaluacion',evalAnualRouter)

//javier evaluacion
app.use('/api/evaluacioncriterio',criterioRouter)
app.use('/api/evaluacionvaloracion',valoracionRouter)

//javier recetas
app.use('/api/recetas',unidadRouter)
app.use('/api/recetas',ingredienteRouter)
app.use('/api/registrareceta',recetasRouter)

//javier mantenimiento
app.use('/api/mantenimiento',beneficiosRouter)

export default app
import './App.css';

import Home from './pages/Home';
import Variedades from './pages/Variedades';
import Mantenimiento from './pages/Mantenimiento';
import ExportImport from './pages/ExportImport';
import Evaluaciones from './pages/Evaluaciones';
import Recetas from './pages/Recetas';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route} from 'react-router-dom'
import FormVariedad from './forms/variedad/FormVariedad';
import FormPrecio from './forms/variedad/FormPrecio';
import FormPais from './forms/mantenimiento/FormPais';
import FormCiudad from './forms/mantenimiento/FormCiudad';
import FormRegion from './forms/mantenimiento/FormRegion';
import FormAsociacionRegional from './forms/mantenimiento/FormAsociacionRegionals';
import FormEmpresaProductora from './forms/mantenimiento/FormEmpresaProductora';
import FormRamasNegocios from './forms/mantenimiento/FormRamasNegocio';
import FormEmpresaProveedora from './forms/mantenimiento/FormEmpresasProveedora';
import FormCultivo from './forms/mantenimiento/FormCultivo';
import FormProduccionAnual from './forms/mantenimiento/FormProduccionAnual';
import FormConvAsocReg from './forms/mantenimiento/FormConvAsocReg';
import FormCatalogo from './forms/mantenimiento/FormCatalogo';
import FormConvenioProveedor from './forms/mantenimiento/FormConvenioProveedor';
import FormPrograma from './forms/mantenimiento/FormPrograma';
import FormPersona from './forms/mantenimiento/FormPersonas';
import FormEmpresaCliente from './forms/exportimport/FormEmpresaCliente';
import FormFormaPago from './forms/exportimport/FormFormaPago';
import FormContrato from './forms/exportimport/FormContrato';
import FormRenovacion from './forms/exportimport/FormRenovacion'
import FormCuotas from './forms/exportimport/FormPagoCuota';
import FormEnvio from './forms/exportimport/FormEnvio';
import FormUnidad from './forms/recetas/FormUnidad'
import FormIngrediente from './forms/recetas/FormIngrediente'
import FormReceta from './forms/recetas/FormReceta'
import FormEvaluacionAnual from './forms/evaluacion/FormEvaluacionAnual';
import FormMulti from './forms/evaluacion/FormMulti'
import FormCriterio from './forms/evaluacion/FormCriterio';
import FormValoraciones from './forms/evaluacion/FormValoraciones';
import FormBeneficio from './forms/mantenimiento/FormBeneficio';

function App() {
  return (
    <div>
        <div>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/home' element={<Home/>} />
                <Route path='/variedades' element={<Variedades/>} />
                    <Route path='/formvariedad' element={<FormVariedad/>}/>
                    <Route path='/formprecio' element={<FormPrecio/>}/>
                <Route path='/mantenimiento' element={<Mantenimiento/>} />
                    <Route path='/formpais' element={<FormPais/> /*Aqui se puede parametrizar la ruta, pasar eso como atributo al form y resumir cdad y reg */}/> 
                    <Route path='/formciudad' element={<FormCiudad/>}/> 
                    <Route path='/formregion' element={<FormRegion/>}/>
                    <Route path='/formasociacionregional' element={<FormAsociacionRegional/>}/>
                    <Route path='/formempresaproductora' element={<FormEmpresaProductora/>}/>
                    <Route path='/formramasnegocio' element={<FormRamasNegocios/>}/>
                    <Route path='/formempresaproveedora' element={<FormEmpresaProveedora/>}/>
                    <Route path='/formcultivo' element={<FormCultivo/>}/>
                    <Route path='/formproduccionanual' element={<FormProduccionAnual/>}/>
                    <Route path='/formconvenioasociacion' element={<FormConvAsocReg/>}/>
                    <Route path='/formcatalogo' element={<FormCatalogo/>}/>
                    <Route path='/formconvenioproveedor' element={<FormConvenioProveedor/>}/>
                    <Route path='/formprogramaapadrinamiento' element={<FormPrograma/>}/>
                    <Route path='/formpersona' element={<FormPersona/>}/>
                    <Route path='/formbeneficio' element={<FormBeneficio/>}/>
                <Route path='/exportimport' element={<ExportImport/>} />
                    <Route path='/formempresacliente' element={<FormEmpresaCliente/>}/>
                    <Route path='/formformapago' element={<FormFormaPago/>}/>
                    <Route path='/formpagocuota' element={<FormCuotas/>}/>
                    <Route path='/formcontrato' element={<FormContrato/>}/>
                    <Route path='/formrenovacion' element={<FormRenovacion/>}/>
                    <Route path='/formenvio' element={<FormEnvio/>}/>
                <Route path='/evaluaciones' element={<Evaluaciones/>} />
                    <Route path='/formevaluacionanual' element={<FormEvaluacionAnual/>}/>
                    <Route path='/formmulti' element={<FormMulti/>} />
                    <Route path='/formcriterio' element={<FormCriterio/>} />
                    <Route path='/formvaloraciones' element={<FormValoraciones/>} />
                <Route path='/recetas' element={<Recetas/>} />
                    <Route path='/formunidad' element={<FormUnidad/>}/>
                    <Route path='/formingrediente' element={<FormIngrediente/>}/>
                    <Route path='/formreceta' element={<FormReceta/>}/>
            </Routes>
        </div>
    </div>
  );
}

export default App;

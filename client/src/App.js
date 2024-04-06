import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Admin from "./elements/Admin";
import Create from "./elements/Create";
import Edit from "./elements/Edit";
import Edit_cargo from "./elements/Edit_cargo";
import Create_cargo from "./elements/Create_cargo";
import Asistencia from "./elements/Asistencia";
import Reporte from "./elements/Reporte"
import Edit_reporte from './elements/Edit_reporte'


function App() {

  // const app = useContext(ContextoApp)
  // console.log(app)

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Asistencia />} />
        <Route path="/asistencia" element={<Asistencia />} />
        {/* <Route element={<ProtectedRoute usuario={!app}/>}> */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/edit_cargo/:id" element={<Edit_cargo />} />
          <Route path="/create_cargo" element={<Create_cargo />} />
          <Route path="/reporte" element={<Reporte />} />
          <Route path="/edit_reporte/:id" element={<Edit_reporte />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

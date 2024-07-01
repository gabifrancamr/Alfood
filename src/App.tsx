import { Routes, Route } from "react-router-dom";
import Home from "./paginas/Home";
import VitrineRestaurantes from "./paginas/VitrineRestaurantes";
import AdministracaoRestaurantes from "./paginas/Administração/Restaurantes/AdministracaoRestaurantes";
import FormularioRestaurante from "./paginas/Administração/Restaurantes/FormularioRestaurante";
import PaginaBaseAdmin from './paginas/Administração/PaginaBaseAdmin'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin/" element={<PaginaBaseAdmin />}>
        <Route
          path="restaurantes"
          element={<AdministracaoRestaurantes />}
        />
        <Route
          path="restaurantes/novo"
          element={<FormularioRestaurante />}
        />
        <Route
          path="restaurantes/:id"
          element={<FormularioRestaurante />}
        />
      </Route>
    </Routes>
  );
}

export default App;

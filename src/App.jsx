import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
// configuracion de rutas permanentes
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Error404 from "./components/Body/Error404/Error404.jsx";

// configuracion de rutas de componentes
import ApartadoEstadosV2 from "./components/Body/GestionarEstados/ApartadoEstadosV2";
import CardPoliticas from "./components/Body/Politicas/CardPoliticas.jsx";
import CardPlanes from "./components/Body/Planes/CardPlanes.jsx";
import GestionModerador from "./components/Body/GestionAdministrador/GestionModerador.jsx";
import ResumenesEstadisticos from "./components/Body/ResumenesEstadisticos/ResumenesEstadisticos.jsx";
import GestionUsuario from "./components/Body/GestionUsuario/GestionUsuario.jsx";
import MonitorearActividades from "./components/Body/MonitorearActividades/monitorearActividades.jsx";
import CardVendedoresD from "./components/Body/Vendedores/CardVendedor.jsx";
import GestionSuperAdmin from "./components/Body/GestionAdministrador/gestionSuperAdmin.jsx";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const NotFound = () => {
  return <Navigate to="/error404" />;
};

function App() {
  return (
    <Router>
      <>
        <ScrollToTop />
        <div className="wrapper">
          <Sidebar />
          <Header />
          <Routes>
            <Route path="/" element={<ResumenesEstadisticos />} />
            <Route path="/dashboard" element={<ResumenesEstadisticos />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/error404" element={<Error404 />} />
            <Route path="/estados" element={<ApartadoEstadosV2 />} />
            <Route path="/politicas" element={<CardPoliticas />} />
            <Route path="/planes" element={<CardPlanes />} />
            <Route path="/moderador" element={<GestionModerador />} />
            <Route path="/administradores" element={<GestionSuperAdmin></GestionSuperAdmin>} />
            <Route path="/usuarios" element={<GestionUsuario />} />
            <Route path="/vendedores" element={<CardVendedoresD />} />
            <Route path="/monitoreo" element={<MonitorearActividades />} />
          </Routes>
          <Footer />
        </div>
      </>
    </Router>
  );
}

export default App;

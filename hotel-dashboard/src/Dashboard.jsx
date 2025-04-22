import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './style.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Clientes from './Clientes';
import Reservas from './Reservas';
import Habitaciones from './Habitaciones';
import Configuracion from './Configuraciones';
import FormularioReserva from './CrearReserva';

const Dashboard = ({ usuario }) => {
  return (
    <div className="Dashboard-container">
      <div className="top-bar">
        <h2>Bienvenido, {usuario}</h2>
        <a href="/logout" className="logout-btn">
          <i className="fa-solid fa-right-from-bracket"></i> Cerrar Sesión
        </a>
      </div>

      <div className="content">
        <div className="cards-container">
          <Link to="/reservas" className="card"><i className="fa-solid fa-bed"></i> Reservas</Link>
          <Link to="/clientes" className="card"><i className="fa-solid fa-users"></i> Clientes</Link>
          <Link to="/habitaciones" className="card"><i className="fa-solid fa-door-open"></i> Habitaciones</Link>
          <Link to="/facturacion" className="card"><i className="fa-solid fa-file-invoice-dollar"></i> Facturación</Link>
          <Link to="/configuracion" className="card"><i className="fa-solid fa-gears"></i> Configuración</Link>
        </div>
      </div>
    </div>
  );
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard usuario="PapulinesAdmin" />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/reservas" element={<Reservas />} />
        <Route path="/habitaciones" element={<Habitaciones />} />
        <Route path="/configuracion" element={<Configuracion />} />
        <Route path="/nueva-reserva" element={<FormularioReserva />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

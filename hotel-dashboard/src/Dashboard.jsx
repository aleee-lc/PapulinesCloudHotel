import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Dashboard = ({ usuario }) => {
  return (
    <div className="dashboard-container">
      <div className="top-bar">
        <h2>Bienvenido, {usuario}</h2>
        <a href="/login" className="logout-btn">
          <i className="fa-solid fa-right-from-bracket"></i> Cerrar Sesión
        </a>
      </div>

      <div className="content">
        <div className="cards-container">
          <Link to="/reservas" className="card">
              <i className="fa-solid fa-bed"></i>
              <span>Reservas</span>
            </Link>

            <Link to="/clientes" className="card">
              <i className="fa-solid fa-users"></i>
              <span>Clientes</span>
            </Link>

            <Link to="/habitaciones" className="card">
              <i className="fa-solid fa-door-open"></i>
              <span>Habitaciones</span>
            </Link>

            <Link to="/configuracion" className="card">
              <i className="fa-solid fa-gears"></i>
              <span>Configuración</span>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

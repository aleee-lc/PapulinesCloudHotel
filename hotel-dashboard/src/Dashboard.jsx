import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './style.css';

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
          <a href="#" className="card"><i className="fa-solid fa-bed"></i> Reservas</a>
          <a href="#" className="card"><i className="fa-solid fa-users"></i> Clientes</a>
          <a href="#" className="card"><i className="fa-solid fa-door-open"></i> Habitaciones</a>
          <a href="#" className="card"><i className="fa-solid fa-file-invoice-dollar"></i> Facturación</a>
          <a href="#" className="card"><i className="fa-solid fa-gears"></i> Configuración</a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

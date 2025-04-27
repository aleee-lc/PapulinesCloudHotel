import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Dashboard = ({ usuario }) => {
  const [tipoCambio, setTipoCambio] = useState(null);
  const [fechaActualizacion, setFechaActualizacion] = useState('');

  useEffect(() => {
    const obtenerTipoCambio = async () => {
      try {
        const response = await fetch('https://open.er-api.com/v6/latest/USD');
        const data = await response.json();
        if (data && data.rates && data.rates.MXN) {
          setTipoCambio(data.rates.MXN);
          const fecha = new Date(data.time_last_update_utc).toLocaleString('es-MX');
          setFechaActualizacion(fecha);
        }
      } catch (error) {
        console.error('Error al obtener tipo de cambio:', error);
      }
    };

    obtenerTipoCambio();
  }, []);

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

        {/* Tipo de cambio abajo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
          <div className="card tipo-cambio-card">
            <i className="fa-solid fa-dollar-sign"></i>
            {tipoCambio ? (
              <>
                <p style={{ fontSize: '24px', marginTop: '10px' }}>1 USD = {tipoCambio.toFixed(2)} MXN</p>
                <small>Actualizado: {fechaActualizacion}</small>
              </>
            ) : (
              <p>Cargando...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import React from 'react';
import './style.css';

const Configuracion = () => {
  return (
    <div className="dashboard-container">
      <div className="top-bar">
        <h1>Configuración</h1>
        <a href="/" className="logout-btn">Regresar</a>
      </div>

      <div className="cards">
        <a href="#" className="card"><i className="fas fa-user-cog"></i>Usuarios</a>
        <a href="#" className="card"><i className="fas fa-key"></i>Permisos</a>
        <a href="#" className="card"><i className="fas fa-database"></i>Base de datos</a>
      </div>

      <p style={{ marginTop: '30px', textAlign: 'center' }}>
        Aquí podrás configurar aspectos generales del sistema como gestión de usuarios,
        permisos de acceso y mantenimiento de la base de datos.
      </p>
    </div>
  );
};

export default Configuracion;

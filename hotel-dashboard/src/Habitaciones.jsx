import React from 'react';
import './style.css';

const Habitaciones = () => {
  return (
    <div className="dashboard-container">
      <div className="top-bar">
        <h1>Habitaciones</h1>
        <a href="/" className="logout-btn">Regresar</a>
      </div>

      <div className="cards">
        <a href="#" className="card"><i className="fas fa-door-open"></i>Agregar Habitación</a>
        <a href="#" className="card"><i className="fas fa-edit"></i>Editar Habitación</a>
        <a href="#" className="card"><i className="fas fa-trash"></i>Eliminar Habitación</a>
      </div>

      <table>
        <thead>
          <tr>
            <th>Número</th>
            <th>Tipo</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>101</td>
            <td>Sencilla</td>
            <td>Disponible</td>
            <td><button>Editar</button> <button>Eliminar</button></td>
          </tr>
          <tr>
            <td>102</td>
            <td>Doble</td>
            <td>Ocupada</td>
            <td><button>Editar</button> <button>Eliminar</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Habitaciones;

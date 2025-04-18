import React from 'react';
import './style.css';

const Reservas = () => {
  return (
    <div className="dashboard-container">
      <div className="top-bar">
        <h1>Reservas</h1>
        <a href="/" className="logout-btn">Regresar</a>
      </div>

      <div className="cards">
        <a href="#" className="card"><i className="fas fa-calendar-plus"></i>Agregar Reserva</a>
        <a href="#" className="card"><i className="fas fa-calendar-edit"></i>Editar Reserva</a>
        <a href="#" className="card"><i className="fas fa-calendar-times"></i>Cancelar Reserva</a>
      </div>

      <table>
        <thead>
          <tr>
            <th>Nombre Cliente</th>
            <th>Habitación</th>
            <th>Fecha Llegada</th>
            <th>Fecha Salida</th>
            <th>Personas</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ana López</td>
            <td>201</td>
            <td>2024-04-01</td>
            <td>2024-04-03</td>
            <td>2</td>
            <td>Reservada</td>
            <td><button>Editar</button> <button>Cancelar</button></td>
          </tr>
          <tr>
            <td>Pedro Jiménez</td>
            <td>202</td>
            <td>2024-04-04</td>
            <td>2024-04-07</td>
            <td>4</td>
            <td>En curso</td>
            <td><button>Editar</button> <button>Finalizar</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Reservas;

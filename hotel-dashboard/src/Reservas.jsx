import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.css';

const Reservas = () => {
  const [reservas, setReservas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/api/reservas')
      .then(res => setReservas(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="dashboard-container">
      <div className="top-bar">
        <h1>Reservas</h1>
        <a href="/" className="logout-btn">Regresar</a>
      </div>

      <div style={{ textAlign: 'right', marginBottom: '20px' }}>
        <button
          onClick={() => navigate('/nueva-reserva')}
          style={{
            backgroundColor: '#2a5298',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Crear Reserva
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Habitación</th>
            <th>Folio</th>
            <th>Folio Ext.</th>
            <th>Procedencia</th>
            <th>Agencia</th>
            <th>Llegada</th>
            <th>Salida</th>
            <th>Noches</th>
            <th>Personas</th>
            <th>Tarifa</th>
            <th>Saldo</th>
            <th>Ingreso Renta</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((r, i) => (
            <tr key={i}>
              <td>{r.nombre}</td>
              <td>{r.apellido}</td>
              <td>{r.habitacion}</td>
              <td>{r.folio}</td>
              <td>{r.folio_ext}</td>
              <td>{r.procedencia}</td>
              <td>{r.agencia}</td>
              <td>{r.llegada}</td>
              <td>{r.salida}</td>
              <td>{r.noches}</td>
              <td>{r.personas}</td>
              <td>${r.tarifa}</td>
              <td style={{ color: r.saldo < 0 ? 'green' : 'red' }}>{r.saldo}</td>
              <td>${r.ingreso_renta}</td>
              <td>{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reservas;

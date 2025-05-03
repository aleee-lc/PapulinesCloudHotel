import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const getEstadoColor = (estado) => {
  switch (estado) {
    case 'Disponible': return 'green';
    case 'Ocupada': return 'red';
    case 'Mantenimiento': return 'orange';
    default: return 'gray';
  }
};

const Habitaciones = () => {
  const [habitaciones, setHabitaciones] = useState([
    { numero: '101', tipo: 'Sencilla', estado: 'Disponible' },
    { numero: '102', tipo: 'Doble', estado: 'Ocupada' },
    { numero: '103', tipo: 'Suite', estado: 'Mantenimiento' },
    { numero: '104', tipo: 'Sencilla', estado: 'Ocupada' },
    { numero: '105', tipo: 'Doble', estado: 'Disponible' },
    { numero: '106', tipo: 'Suite', estado: 'Disponible' },
  ]);

  const [seleccionada, setSeleccionada] = useState(null);
  const [nueva, setNueva] = useState({ numero: '', tipo: 'Sencilla' });
  const navigate = useNavigate();

  const manejarClick = (hab) => {
    setSeleccionada(hab.numero === seleccionada?.numero ? null : hab);
  };

  const cambiarEstado = (nuevoEstado) => {
    setHabitaciones(prev => prev.map(h =>
      h.numero === seleccionada.numero ? { ...h, estado: nuevoEstado } : h
    ));
    setSeleccionada(null);
  };

  const agregarHabitacion = () => {
    if (nueva.numero.trim() !== '') {
      setHabitaciones(prev => [...prev, { ...nueva, estado: 'Disponible' }]);
      setNueva({ numero: '', tipo: 'Sencilla' });
    }
  };

  const iniciarCheckIn = () => {
    navigate(`/nueva-reserva?habitacion=${seleccionada.numero}`);
  };

  return (
    <div className="dashboard-container">
      <div className="top-bar">
        <h1>Rack de Habitaciones</h1>
        <a href="/" className="logout-btn">Regresar</a>
      </div>

      <div className="formulario compacto" style={{ marginBottom: '30px' }}>
        <div className="input-container">
          <label>Número</label>
          <input value={nueva.numero} onChange={(e) => setNueva({ ...nueva, numero: e.target.value })} />
        </div>
        <div className="input-container">
          <label>Tipo</label>
          <select value={nueva.tipo} onChange={(e) => setNueva({ ...nueva, tipo: e.target.value })}>
            <option value="Sencilla">Sencilla</option>
            <option value="Doble">Doble</option>
            <option value="Suite">Suite</option>
          </select>
        </div>
        <div className="input-container" style={{ gridColumn: '1 / -1' }}>
          <button className="submit-btn" onClick={agregarHabitacion}>Agregar Habitación</button>
        </div>
      </div>

      <div className="rack-grid">
        {habitaciones.map((hab, index) => (
          <div
            key={index}
            className="habitacion-box"
            style={{ borderColor: getEstadoColor(hab.estado) }}
            onClick={() => manejarClick(hab)}
          >
            <h3>Habitación {hab.numero}</h3>
            <p>Tipo: {hab.tipo}</p>
            <p>Estado: <strong style={{ color: getEstadoColor(hab.estado) }}>{hab.estado}</strong></p>
          </div>
        ))}
      </div>

      {seleccionada && (
        <div className="habitacion-detalle">
          <h2>Detalles de la Habitación {seleccionada.numero}</h2>
          <p><strong>Tipo:</strong> {seleccionada.tipo}</p>
          <p><strong>Estado actual:</strong> <span style={{ color: getEstadoColor(seleccionada.estado) }}>{seleccionada.estado}</span></p>
          <div style={{ marginTop: '15px' }}>
            <button className="submit-btn" onClick={iniciarCheckIn} disabled={seleccionada.estado !== 'Disponible'}>
              Hacer Check-In
            </button>
            <button className="submit-btn" onClick={() => cambiarEstado('Disponible')} disabled={seleccionada.estado !== 'Ocupada'} style={{ marginLeft: '10px' }}>
              Hacer Check-Out
            </button>
            <button className="submit-btn" onClick={() => cambiarEstado('Mantenimiento')} style={{ marginLeft: '10px' }}>
              Marcar Mantenimiento
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Habitaciones;

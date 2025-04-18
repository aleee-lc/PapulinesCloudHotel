import React, { useState } from 'react';
import axios from 'axios';
import './style.css';

const FormularioReserva = () => {
  const [reserva, setReserva] = useState({
    nombre: '',
    apellido: '',
    habitacion: '',
    folio: '',
    folio_ext: '',
    procedencia: '',
    agencia: '',
    llegada: '',
    salida: '',
    personas: 1,
    tarifa: 0,
    status: 'Reservada'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedReserva = { ...reserva, [name]: value };

    if (name === 'tarifa') {
      const tarifa = parseFloat(value);
      updatedReserva.ingreso_renta = tarifa ? (tarifa / 1.19).toFixed(2) : 0;
    }

    setReserva(updatedReserva);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const noches = Math.ceil((new Date(reserva.salida) - new Date(reserva.llegada)) / (1000 * 60 * 60 * 24));
      const payload = { ...reserva, noches: noches, ingreso_renta: (reserva.tarifa / 1.19).toFixed(2) };
      await axios.post('http://localhost:3000/api/reservas', payload);
      alert('Reserva registrada correctamente');
      setReserva({ ...reserva, nombre: '', apellido: '', habitacion: '', folio: '', folio_ext: '', llegada: '', salida: '' });
    } catch (error) {
      console.error(error);
      alert('Error al registrar reserva');
    }
  };

  return (
    <div className="dashboard-container">
      <div className="top-bar">
        <h1>Nueva Reserva</h1>
        <a href="/reservas" className="logout-btn">Regresar</a>
      </div>

      <form onSubmit={handleSubmit} className="formulario">
        <div className="input-container">
          <label>Nombre</label>
          <input name="nombre" value={reserva.nombre} onChange={handleChange} required />
        </div>
        <div className="input-container">
          <label>Apellido</label>
          <input name="apellido" value={reserva.apellido} onChange={handleChange} required />
        </div>
        <div className="input-container">
          <label>Habitación</label>
          <input name="habitacion" value={reserva.habitacion} onChange={handleChange} required />
        </div>
        <div className="input-container">
          <label>Folio</label>
          <input name="folio" value={reserva.folio} onChange={handleChange} required />
        </div>
        <div className="input-container">
          <label>Folio Ext.</label>
          <input name="folio_ext" value={reserva.folio_ext} onChange={handleChange} />
        </div>
        <div className="input-container">
          <label>Procedencia</label>
          <input name="procedencia" value={reserva.procedencia} onChange={handleChange} />
        </div>
        <div className="input-container">
          <label>Agencia</label>
          <input name="agencia" value={reserva.agencia} onChange={handleChange} />
        </div>
        <div className="input-container">
          <label>Fecha de Llegada</label>
          <input type="date" name="llegada" value={reserva.llegada} onChange={handleChange} required />
        </div>
        <div className="input-container">
          <label>Fecha de Salida</label>
          <input type="date" name="salida" value={reserva.salida} onChange={handleChange} required />
        </div>
        <div className="input-container">
          <label>Personas</label>
          <input type="number" name="personas" value={reserva.personas} onChange={handleChange} />
        </div>
        <div className="input-container">
          <label>Tarifa</label>
          <input type="number" name="tarifa" value={reserva.tarifa} onChange={handleChange} />
        </div>
        <div className="input-container">
          <label>Ingreso Renta (automático)</label>
          <input type="text" name="ingreso_renta" value={reserva.ingreso_renta || ''} readOnly />
        </div>

        <button type="submit" className="submit-btn">Guardar Reserva</button>
      </form>
    </div>
  );
};

export default FormularioReserva;

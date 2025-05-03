import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

const FormularioReserva = () => {
  const [reserva, setReserva] = useState({
    nombre: '',
    apellido: '',
    numero: '',
    folio: '',
    folio_ext: '',
    procedencia: '',
    agencia: '',
    llegada: '',
    salida: '',
    personas: 1,
    tarifa: 0,
    ingreso_renta: 0,
    status: 'Reservada'
  });

  // Corregido: ahora sí tienes handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReserva({
      ...reserva,
      [name]: value
    });
  };

  useEffect(() => {
    const fetchTarifa = async () => {
      if (reserva.numero && reserva.llegada && reserva.salida) {
        try {
          const res = await axios.get(`http://localhost:3000/api/habitaciones/numero/${reserva.numero}`);
          const tarifa = res.data.tarifa;

          const llegada = new Date(reserva.llegada);
          const salida = new Date(reserva.salida);

          // Convertir a medianoche para evitar desfase horario
          llegada.setHours(0, 0, 0, 0);
          salida.setHours(0, 0, 0, 0);

          // Calcular noches
          const diffTime = salida.getTime() - llegada.getTime();
          const noches = Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)));
          const total_bruto = tarifa * noches;
          const ingreso_renta = parseFloat(((tarifa * noches) / 1.19).toFixed(2));


          setReserva(prev => ({
            ...prev,
            tarifa,
            ingreso_renta,
            total_bruto
          }));
        } catch (error) {
          console.error('Error al obtener tarifa:', error.response?.data || error.message);
          setReserva(prev => ({
            ...prev,
            tarifa: 0,
            ingreso_renta: 0,
            total_bruto: 0
          }));
        }
      }
    };

    fetchTarifa();
  }, [reserva.numero, reserva.llegada, reserva.salida]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/reservas', reserva);
      alert('Reserva registrada correctamente');
      window.location.reload();
    } catch (error) {
      console.error('Error al guardar reserva:', error.response?.data || error.message);
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
          <input name="numero" value={reserva.numero} onChange={handleChange} required />
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
          <input type="number" name="tarifa" value={reserva.tarifa} readOnly/>
        </div>
        <div className="input-container">
          <label>Ingreso Renta</label>
          <input type="text" name="ingreso_renta" value={reserva.ingreso_renta || ''} readOnly />
        </div>
        <div className="input-container">
          <label>Total a Pagar</label>
          <input type="text" name="total_bruto" value={reserva.total_bruto || ''} readOnly />
        </div>

        <button type="submit" className="submit-btn">Guardar Reserva</button>
      </form>
    </div>
  );
};

export default FormularioReserva;

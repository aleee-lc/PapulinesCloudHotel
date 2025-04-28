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
    procedencia: 'Web',
    agencia: '',
    llegada: '',
    salida: '',
    personas: 1,
    tarifa: 0,
    ingreso_renta: 0,
    saldo: 0,
    tipo: '',
    cargo_extra: 0,
    total_bruto: 0
  });

  //const [habitacionInfo, setHabitacionInfo] = useState({ tipo: '' });

  // Corregido: ahora sí tienes handleChange
  /*const handleChange = (e) => {
    const { name, value } = e.target;
    setReserva({
      ...reserva,
      [name]: value
    });
  };*/

  useEffect(() => {
    const obtenerFolio = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/reservas/siguiente-folio');
        setReserva(prev => ({
          ...prev,
          folio: res.data.folio,
          folio_ext: res.data.folio_ext
        }));
      } catch (error) {
        console.error('Error al obtener folio:', error);
      }
    };
  
    obtenerFolio();
  }, []);

  // Obtener tarifa y tipo al ingresar número de habitación
  useEffect(() => {
    const fetchHabitacion = async () => {
      if (reserva.numero) {
        try {
          const res = await axios.get(`http://localhost:3000/api/habitaciones/numero/${reserva.numero}`);
          setReserva(prev => ({
            ...prev,
            tarifa: res.data.tarifa,
            tipo: res.data.tipo
          }));
        } catch (error) {
          console.error('Error al obtener información de habitación:', error);
        }
      }
    };
    fetchHabitacion();
  }, [reserva.numero]);

  useEffect(() => {
    const fetchTarifa = async () => {
      if (reserva.numero && reserva.llegada && reserva.salida) {
        try {
          const res = await axios.get(`http://localhost:3000/api/habitaciones/numero/${reserva.numero}`);
          const tarifa = res.data.tarifa;
          const tipo = res.data.tipo;

          const llegada = new Date(reserva.llegada);
          const salida = new Date(reserva.salida);

          // Convertir a medianoche para evitar desfase horario
          llegada.setHours(0, 0, 0, 0);
          salida.setHours(0, 0, 0, 0);

          // Calcular noches
          const diffTime = salida.getTime() - llegada.getTime();
          const noches = Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)));
          
          //const total_bruto = tarifa * noches;
          const ingreso_renta = parseFloat(((tarifa * noches) / 1.19).toFixed(2));
          const total_bruto = (tarifa * noches) + reserva.cargo_extra;


          setReserva(prev => ({
            ...prev,
            ingreso_renta,
            total_bruto
          }));
        } catch (error) {
          console.error('Error al obtener tarifa:', error.response?.data || error.message);
        }
      }
    };

    fetchTarifa();
  }, [reserva.numero, reserva.llegada, reserva.salida, reserva.cargo_extra]);

  const getMaxPersonas = () => {
    if (reserva.tipo === 'Sencilla') return 2;
    if (reserva.tipo === 'Doble') return 4;
    if (reserva.tipo === 'Suite') return 12;
    return 1; // Default si no hay tipo todavía
  };
  
  // Función especial para cambiar personas y calcular cargo extra
  // Lógica para definir máximos y cargo extra
  const handlePersonasChange = (e) => {
    let personas = parseInt(e.target.value, 10) || 1;
    let personasBase = 1;
    let maxPersonas = 2;

    if (reserva.tipo === 'Doble') {
      personasBase = 2;
      maxPersonas = 4;
    } else if (reserva.tipo === 'Suite') {
      personasBase = 8;
      maxPersonas = 12;
    }

    if (personas > maxPersonas) {
      alert(`Esta habitación sólo permite máximo ${maxPersonas} personas.`);
      personas = maxPersonas;
    } else if (personas < 1) {
      personas = 1;
    }

    let personasExtras = 0;
    if (personas > personasBase) {
      personasExtras = personas - personasBase;
    }

    // ⚡ Aquí calculamos bien el cargo extra por noche y por cantidad de noches
    const llegada = new Date(reserva.llegada);
    const salida = new Date(reserva.salida);

    llegada.setHours(0, 0, 0, 0);
    salida.setHours(0, 0, 0, 0);

    const diffTime = salida.getTime() - llegada.getTime();
    const noches = Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)));

    const cargo_extra = personasExtras * 250 * noches;

    setReserva(prev => ({
      ...prev,
      personas,
      cargo_extra
    }));
  };

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReserva(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
          <input type="text" name="folio" value={reserva.folio || ''} readOnly />
        </div>
        <div className="input-container">
          <label>Folio Ext.</label>
          <input type="text" name="folio_ext" value={reserva.folio_ext || ''} readOnly />
        </div>
        <div className="input-container">
          <label>Procedencia</label>
          <input type="text" name="procedencia" value={reserva.procedencia} readOnly />
        </div>
        <div className="input-container">
          <label>Agencia</label>
          <select name="agencia" value={reserva.agencia} onChange={handleChange} required>
            <option value="">Seleccione una agencia</option>
            <option value="Booking">Booking</option>
            <option value="Expedia">Expedia</option>
            <option value="Hotel Beds">Hotel Beds</option>
            <option value="Agoda">Agoda</option>
            <option value="Best Day">Best Day</option>
          </select>
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
          <input type="number" name="personas" value={reserva.personas} onChange={handlePersonasChange} min="1" required />
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

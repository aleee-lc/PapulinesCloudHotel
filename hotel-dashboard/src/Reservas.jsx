// Código actualizado para incluir filtro por fecha + edición + estado de cuenta

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const Reservas = () => {
  const [reservaActiva, setReservaActiva] = useState(null);
  const [tipo, setTipo] = useState('cargo');
  const [concepto, setConcepto] = useState('');
  const [monto, setMonto] = useState(0);
  const [nota, setNota] = useState('');
  const [mostrarEstadoCuenta, setMostrarEstadoCuenta] = useState(false);
  const [filtroInicio, setFiltroInicio] = useState('');
  const [filtroFin, setFiltroFin] = useState('');
  const navigate = useNavigate();

  const reservas = [
    {
      nombre: "Andrea",
      apellido: "Castillo",
      habitacion: "202",
      folio: "R1001",
      folio_ext: "EXT-R1001",
      procedencia: "Web",
      agencia: "Booking",
      llegada: "2024-04-18",
      salida: "2024-04-21",
      noches: 3,
      personas: 2,
      tarifa: 1800,
      saldo: -500,
      ingreso_renta: 1512.61,
      status: "Check-In"
    }
  ];

  const movimientos = [
    {
      id: 1,
      tipo: "cargo",
      descripcion: "Renta",
      monto: 1800,
      nota: "Renta de habitación 3 noches",
      fecha: "2024-04-18T14:22:00"
    },
    {
      id: 2,
      tipo: "abono",
      descripcion: "Efectivo",
      monto: 500,
      nota: "Anticipo pagado",
      fecha: "2024-04-18T15:30:00"
    }
  ];

  const filtrarReservas = reservas.filter(r => {
    if (!filtroInicio || !filtroFin) return true;
    return r.llegada >= filtroInicio && r.salida <= filtroFin;
  });

  const toggleEditar = (reserva) => {
    if (reservaActiva?.folio === reserva.folio) {
      setReservaActiva(null);
      setMostrarEstadoCuenta(false);
    } else {
      setReservaActiva({ ...reserva });
      setMostrarEstadoCuenta(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservaActiva({ ...reservaActiva, [name]: value });
  };

  const totalCargos = movimientos.filter(m => m.tipo === 'cargo').reduce((sum, m) => sum + parseFloat(m.monto), 0);
  const totalAbonos = movimientos.filter(m => m.tipo === 'abono').reduce((sum, m) => sum + parseFloat(m.monto), 0);
  const saldoCalculado = (totalCargos - totalAbonos).toFixed(2);

  const registrarMovimiento = () => {
    alert(`Simulando ${tipo.toUpperCase()}: $${monto} - ${concepto}\nNota: ${nota}`);
    setMonto(0);
    setNota('');
    setConcepto('');
  };

  return (
    <div className="dashboard-container">
      <div className="top-bar">
        <h1>Reservas</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <a href="/" className="logout-btn">Regresar</a>
          <button className="submit-btn" onClick={() => navigate('/nueva-reserva')}>Crear Reserva</button>
        </div>
      </div>

      <div className="formulario compacto" style={{ marginBottom: '20px' }}>
        <div className="input-container">
          <label>Desde</label>
          <input type="date" value={filtroInicio} onChange={(e) => setFiltroInicio(e.target.value)} />
        </div>
        <div className="input-container">
          <label>Hasta</label>
          <input type="date" value={filtroFin} onChange={(e) => setFiltroFin(e.target.value)} />
        </div>
      </div>

      <table className="tabla-reservas">
        <thead>
          <tr>
            <th>Nombre</th><th>Apellido</th><th>Habitación</th><th>Folio</th><th>Folio Ext.</th>
            <th>Procedencia</th><th>Agencia</th><th>Llegada</th><th>Salida</th><th>Noches</th>
            <th>Personas</th><th>Tarifa</th><th>Saldo</th><th>Ingreso Renta</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filtrarReservas.map((r, i) => (
            <React.Fragment key={i}>
              <tr onClick={() => toggleEditar(r)} style={{ cursor: 'pointer' }}>
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
              {reservaActiva?.folio === r.folio && (
                <tr>
                  <td colSpan="15">
                    <div className="estado-cuenta-container">
                      <h3 style={{ marginBottom: '10px' }}>Editar Reserva</h3>
                      <form className="formulario compacto">
                        <div className="input-container">
                          <label>Nombre</label>
                          <input name="nombre" value={reservaActiva.nombre} onChange={handleChange} />
                        </div>
                        <div className="input-container">
                          <label>Apellido</label>
                          <input name="apellido" value={reservaActiva.apellido} onChange={handleChange} />
                        </div>
                        <div className="input-container">
                          <label>Procedencia</label>
                          <input name="procedencia" value={reservaActiva.procedencia} onChange={handleChange} />
                        </div>
                        <div className="input-container">
                          <label>Agencia</label>
                          <input name="agencia" value={reservaActiva.agencia} onChange={handleChange} />
                        </div>
                        <div className="input-container">
                          <label>Habitación</label>
                          <input name="habitacion" value={reservaActiva.habitacion} onChange={handleChange} />
                        </div>
                        <div className="input-container">
                          <label>Llegada</label>
                          <input name="llegada" type="date" value={reservaActiva.llegada} onChange={handleChange} />
                        </div>
                        <div className="input-container">
                          <label>Salida</label>
                          <input name="salida" type="date" value={reservaActiva.salida} onChange={handleChange} />
                        </div>
                      </form>
                      <div style={{ textAlign: 'right', marginTop: '10px' }}>
                        <button className="submit-btn" onClick={() => setMostrarEstadoCuenta(!mostrarEstadoCuenta)}>
                          {mostrarEstadoCuenta ? 'Ocultar Estado de Cuenta' : 'Ver Estado de Cuenta'}
                        </button>
                      </div>

                      {mostrarEstadoCuenta && (
                        <>
                          <h3 style={{ marginTop: '30px' }}>Estado de Cuenta</h3>
                          <table>
                            <thead>
                              <tr>
                                <th>ID</th>
                                <th>Tipo</th>
                                <th>Descripción</th>
                                <th>Monto</th>
                                <th>Nota</th>
                                <th>Fecha</th>
                              </tr>
                            </thead>
                            <tbody>
                              {movimientos.map((mov) => (
                                <tr key={mov.id}>
                                  <td>{mov.id}</td>
                                  <td>{mov.tipo}</td>
                                  <td>{mov.descripcion}</td>
                                  <td>${mov.monto}</td>
                                  <td>{mov.nota}</td>
                                  <td>{new Date(mov.fecha).toLocaleString()}</td>
                                </tr>
                              ))}
                              <tr style={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>
                                <td colSpan="3">Total Cargos</td>
                                <td colSpan="3">${totalCargos}</td>
                              </tr>
                              <tr style={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>
                                <td colSpan="3">Total Abonos</td>
                                <td colSpan="3">${totalAbonos}</td>
                              </tr>
                              <tr style={{ fontWeight: 'bold', backgroundColor: '#dff0d8' }}>
                                <td colSpan="3">Saldo Calculado</td>
                                <td colSpan="3">${saldoCalculado}</td>
                              </tr>
                            </tbody>
                          </table>
                          <form className="formulario compacto" onSubmit={(e) => { e.preventDefault(); registrarMovimiento(); }}>
                            <div className="input-container">
                              <label>Tipo</label>
                              <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                                <option value="cargo">Cargo</option>
                                <option value="abono">Abono</option>
                              </select>
                            </div>
                            <div className="input-container">
                              <label>Concepto</label>
                              <input value={concepto} onChange={(e) => setConcepto(e.target.value)} />
                            </div>
                            <div className="input-container">
                              <label>Monto</label>
                              <input type="number" value={monto} onChange={(e) => setMonto(e.target.value)} />
                            </div>
                            <div className="input-container">
                              <label>Nota</label>
                              <input type="text" value={nota} onChange={(e) => setNota(e.target.value)} />
                            </div>
                            <div className="input-container" style={{ gridColumn: '1 / -1' }}>
                              <button className="submit-btn">Registrar Movimiento</button>
                            </div>
                          </form>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reservas;

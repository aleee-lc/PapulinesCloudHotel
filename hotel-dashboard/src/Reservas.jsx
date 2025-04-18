import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';

const Reservas = () => {
  const [reservas, setReservas] = useState([]);
  const [reservaActiva, setReservaActiva] = useState(null);
  const [movimientos, setMovimientos] = useState([]);
  const [tipoMovimiento, setTipoMovimiento] = useState('cargo');
  const [conceptos, setConceptos] = useState([]);
  const [idTipoMov, setIdTipoMov] = useState('');
  const [monto, setMonto] = useState(0);
  const [nota, setNota] = useState('');

    //Para jalar de la bd
    //useEffect(() => {
      //axios.get('http://localhost:3000/api/reservas')
        //.then(res => setReservas(res.data))
        //.catch(err => console.error(err));
    //}, []);
  
    //Para mostrar datos de ejemplo o pruebas
    useEffect(() => {
      const reservasPrueba = [
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
      setReservas(reservasPrueba);
    }, []);

 /* const toggleEditar = (reserva) => {
    if (reservaActiva?.folio === reserva.folio) {
      setReservaActiva(null);
      setMovimientos([]);
    } else {
      setReservaActiva(reserva);
      axios.get(`http://localhost:3000/api/movimientos/${reserva.folio}`)
        .then(res => setMovimientos(res.data));
      axios.get(`http://localhost:3000/api/tipo_movimientos?tipo=${tipoMovimiento}`)
        .then(res => setConceptos(res.data));
    }
    setMonto(0);
    setNota('');
  };*/

  /*const registrarMovimiento = async () => {
    try {
      const movimiento = {
        folio_reserva: reservaActiva.folio,
        tipo: tipoMovimiento,
        id_tipo_mov: idTipoMov,
        nota,
        monto: parseFloat(monto),
        fecha: new Date().toISOString()
      };

      await axios.post('http://localhost:3000/api/movimientos', movimiento);
      await axios.put(`http://localhost:3000/api/reservas/${reservaActiva.folio}/saldo`, {
        operacion: tipoMovimiento,
        monto: parseFloat(monto)
      });

      const reservaActualizada = await axios.get(`http://localhost:3000/api/reservas/${reservaActiva.folio}`);
      const nuevosMovs = await axios.get(`http://localhost:3000/api/movimientos/${reservaActiva.folio}`);

      setReservaActiva(reservaActualizada.data);
      setMovimientos(nuevosMovs.data);
      setMonto(0);
      setNota('');
    } catch (err) {
      console.error(err);
      alert('Error al registrar el movimiento');
    }
  };

  useEffect(() => {
    if (tipoMovimiento) {
      axios.get(`http://localhost:3000/api/tipo_movimientos?tipo=${tipoMovimiento}`)
        .then(res => setConceptos(res.data));
    }
  }, [tipoMovimiento]);*/

  return (
    <div className="dashboard-container">
      <div className="top-bar">
        <h1>Reservas</h1>
        <a href="/" className="logout-btn">Regresar</a>
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
                    <div className="formulario">
                      <div className="input-container">
                        <label>Tipo</label>
                        <select value={tipoMovimiento} onChange={(e) => setTipoMovimiento(e.target.value)}>
                          <option value="cargo">Cargo</option>
                          <option value="abono">Abono</option>
                        </select>
                      </div>
                      <div className="input-container">
                        <label>Concepto</label>
                        <select value={idTipoMov} onChange={(e) => setIdTipoMov(e.target.value)}>
                          <option value="">Selecciona</option>
                          {conceptos.map(c => (
                            <option key={c.id} value={c.id}>{c.descripcion}</option>
                          ))}
                        </select>
                      </div>
                      <div className="input-container">
                        <label>Monto</label>
                        <input type="number" value={monto} onChange={(e) => setMonto(e.target.value)} />
                      </div>
                      <div className="input-container" style={{ gridColumn: '1 / -1' }}>
                        <label>Nota</label>
                        <input type="text" value={nota} onChange={(e) => setNota(e.target.value)} />
                      </div>
                      <div className="input-container" style={{ gridColumn: '1 / -1' }}>
                        <button className="submit-btn" onClick={registrarMovimiento}>Registrar Movimiento</button>
                      </div>

                      <div style={{ gridColumn: '1 / -1', marginTop: '20px' }}>
                        <h3>Estado de Cuenta</h3>
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
                          </tbody>
                        </table>
                      </div>
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
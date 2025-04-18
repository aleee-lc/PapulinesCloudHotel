import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [filtro, setFiltro] = useState('todos');

  useEffect(() => {
    axios.get('http://localhost:3000/api/clientes')
      .then(res => setClientes(res.data))
      .catch(err => console.error(err));
  }, []);

  const clientesFiltrados = clientes.filter(c => filtro === 'todos' || c.status === filtro);

  return (
    <div className="dashboard-container">
      <div className="top-bar">
        <h1>Clientes</h1>
        <a href="/" className="logout-btn">Regresar</a>
      </div>

      <div className="cards">
        <a href="#" className="card"><i className="fas fa-user-plus"></i>Agregar Cliente</a>
        <a href="#" className="card"><i className="fas fa-edit"></i>Editar Cliente</a>
        {/* Eliminar Cliente removido */}
      </div>

      <form>
        <label htmlFor="status">Filtrar por Status:</label>
        <select id="status" value={filtro} onChange={(e) => setFiltro(e.target.value)}>
          <option value="todos">Todos</option>
          <option value="Check-In">Check-In</option>
          <option value="Check-Out">Check-Out</option>
          <option value="MTR">MTR</option>
        </select>
      </form>

      <table>
        <thead>
          <tr>
            <th>Nombre</th><th>Apellido</th><th>Habitación</th><th>Folio</th>
            <th>Folio Ext.</th><th>Procedencia</th><th>Agencia</th>
            <th>Llegada</th><th>Salida</th><th>Noches</th><th>Personas</th>
            <th>Tarifa</th><th>Saldo</th><th>Ingreso Renta</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {clientesFiltrados.map((c, i) => (
            <tr key={i}>
              <td>{c.nombre}</td>
              <td>{c.apellido}</td>
              <td>{c.habitacion}</td>
              <td>{c.folio}</td>
              <td>{c.folio_ext}</td>
              <td>{c.procedencia}</td>
              <td>{c.agencia}</td>
              <td>{c.llegada}</td>
              <td>{c.salida}</td>
              <td>{c.noches}</td>
              <td>{c.personas}</td>
              <td>${c.tarifa}</td>
              <td style={{ color: c.saldo < 0 ? 'green' : 'red' }}>{c.saldo}</td>
              <td>${c.ingreso_renta}</td>
              <td>{c.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Clientes;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import Clientes from './Clientes';
import Reservas from './Reservas';
import Habitaciones from './Habitaciones';
import Configuracion from './Configuraciones';
import './style.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Menú de navegación */}
        <nav className="top-bar">
          <h2>Papulines Cloud Hotel</h2>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link className="logout-btn" to="/">Dashboard</Link>
            <Link className="logout-btn" to="/clientes">Clientes</Link>
            <Link className="logout-btn" to="/reservas">Reservas</Link>
            <Link className="logout-btn" to="/habitaciones">Habitaciones</Link>
            <Link className="logout-btn" to="/configuraciones">Configuración</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Dashboard usuario="PapulinesAdmin" />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/reservas" element={<Reservas />} />
          <Route path="/habitaciones" element={<Habitaciones />} />
          <Route path="/configuracion" element={<Configuracion />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

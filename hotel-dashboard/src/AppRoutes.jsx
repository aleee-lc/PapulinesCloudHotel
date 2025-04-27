import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Clientes from './Clientes';
import Reservas from './Reservas';
import Habitaciones from './Habitaciones';
import Configuracion from './Configuraciones';
import FormularioReserva from './CrearReserva';

const AppRoutes = ({usuario}) => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard usuario={usuario} />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/reservas" element={<Reservas />} />
      <Route path="/habitaciones" element={<Habitaciones />} />
      <Route path="/configuracion" element={<Configuracion />} />
      <Route path="/nueva-reserva" element={<FormularioReserva />} />
    </Routes>
  );
};

export default AppRoutes;

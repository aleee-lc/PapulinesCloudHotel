import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import AppRoutes from './AppRoutes';

const App = () => {
  const [usuario, setUsuario] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={(nombre) => setUsuario(nombre)} />} />
        <Route
          path="/*"
          element={usuario ? <AppRoutes usuario={usuario} /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;

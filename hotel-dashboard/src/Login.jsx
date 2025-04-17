import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './style.css'; // Usa los mismos estilos del dashboard

const Login = ({ onLogin }) => {
  const [usuario, setUsuario] = useState('');

  const manejarSubmit = (e) => {
    e.preventDefault();
    if (usuario.trim()) {
      onLogin(usuario); // Envía el nombre al componente padre
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={manejarSubmit}>
        <div className="input-container">
          <i className="fa-solid fa-user"></i>
          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;

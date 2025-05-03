import React, { useState } from 'react';
import axios from 'axios';
//import { useNavigate } from 'react-router-dom';
//import '@fortawesome/fontawesome-free/css/all.min.css';
import './style.css';
import { useNavigate } from 'react-router-dom';

const Login = ({onLogin}) => {
  const [nombre, setNombre] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const manejarSubmit = async (e) => {
    e.preventDefault();
    console.log('Intentando login:', nombre, contrasena);
    try {
      const res = await axios.post('http://localhost:3000/api/login', {
        nombre,
        contraseña: contrasena
      }, {
        withCredentials: true
      });

      console.log('Login exitoso:', res.data);

      if (res.data.usuario) {
        onLogin(res.data.usuario.nombre); // Guarda el usuario en App
        navigate('/'); // redirige al dashboard
      }
    } catch (err) {
      //console.error(err);
      console.error('Error en login:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Error al iniciar sesión');
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
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <i className="fa-solid fa-key"></i>
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;

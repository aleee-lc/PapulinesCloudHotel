import express from 'express';
import pool from '../db.js';
//import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { nombre, contraseña } = req.body;

  if (!nombre || !contraseña) {
    return res.status(400).json({ error: 'Nombre y contraseña requeridos' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE nombre = ?', [nombre]);

    if (rows.length === 0) {
      console.log('Usuario no encontrado:', nombre);
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    const usuario = rows[0];

    // Logs para depurar
    console.log('Usuario encontrado:', usuario.nombre);
    console.log('Contraseña enviada:', contraseña);
    console.log('Contraseña en BD:', usuario.contraseña);

    if (contraseña !== usuario.contraseña) {
        console.log('Contraseña incorrecta');
        return res.status(401).json({ error: 'Contraseña incorrecta' });
      }

      req.session.usuario = {
        id: usuario.id,
        nombre: usuario.nombre,
        rol: usuario.rol || null,
        tipo: usuario.tipo_usuario || null
      };

      console.log('Login exitoso');
      res.json({ mensaje: 'Login exitoso', usuario: req.session.usuario });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

router.get('/me', (req, res) => {
  if (req.session.usuario) {
    res.json(req.session.usuario);
  } else {
    res.status(401).json({ error: 'No autenticado' });
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.sendStatus(200);
});

export default router;

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/login', async (req, res) => {
  const { usuario, contrasena } = req.body;

  try {
    const [rows] = await pool.query(
      'SELECT * FROM usuarios WHERE nombre = ? AND contrasena = ?',
      [usuario, contrasena]
    );

    if (rows.length > 0) {
      res.send('Login exitoso. Bienvenido al sistema.');
    } else {
      res.status(401).send('Usuario o contraseña incorrectos');
    }
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).send('Error interno del servidor');
  }
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});

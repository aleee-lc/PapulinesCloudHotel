import express from 'express';
import session from 'express-session';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import reservasRoutes from './routes/reservasRoutes.js';
import habitacionesRoutes from './routes/habitacionesRoutes.js';

const app = express();
const PORT = 3000;

app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));

app.use(express.json());

app.use(session({
  secret: 'papulines-secret',
  resave: false,
  saveUninitialized: true
}));

app.use('/api', authRoutes);

app.use('/api/reservas', reservasRoutes);

app.use('/api/habitaciones', habitacionesRoutes);


app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});

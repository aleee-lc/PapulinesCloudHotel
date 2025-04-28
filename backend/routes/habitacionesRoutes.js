import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Obtener tarifa por número de habitación
router.get('/numero/:numero', async (req, res) => {
  const { numero } = req.params;
  try {
    const [rows] = await pool.query(
      'SELECT tarifa, tipo FROM habitaciones WHERE numero = ?',
      [numero]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Habitación no encontrada' });
    }

    res.json({
      tarifa: rows[0].tarifa,
      tipo: rows[0].tipo
    });
  } catch (error) {
    console.error('Error al consultar tarifa:', error);
    res.status(500).json({ error: 'Error interno al obtener tarifa' });
  }
});

export default router;


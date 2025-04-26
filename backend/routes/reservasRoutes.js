import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Crear nueva reserva
router.post('/', async (req, res) => {
  const r = req.body;
  try {
    // 1. Consultar tarifa de la habitación
    const [habitacion] = await pool.query(
      'SELECT id_habitacion, tarifa FROM habitaciones WHERE numero = ?',
      [r.numero]
    );

    if (habitacion.length === 0) {
      return res.status(404).json({ error: 'Habitación no encontrada' });
    }

    const id_habitacion = habitacion[0].id_habitacion;
    const tarifa = habitacion[0].tarifa;

    // 2. Calcular noches y renta sin impuestos
    const llegada = new Date(r.llegada);
    const salida = new Date(r.salida);
    const noches = Math.ceil((salida - llegada) / (1000 * 60 * 60 * 24));
    const ingreso_renta = parseFloat(((tarifa * noches) / 1.19).toFixed(2));
    const total_bruto = tarifa * noches;

    // 3. Insertar reserva
    await pool.query(
      `INSERT INTO reservas (
        id_habitacion, llegada, salida, personas, tarifa, estado, comentarios,
        saldo, nombre, apellido, folio, folio_ext, procedencia, agencia, ingreso_renta, total_bruto
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id_habitacion,
        r.llegada,
        r.salida,
        r.personas || 1,
        tarifa,
        r.estado || 'Reservada',
        r.comentarios || '',
        r.saldo || 0,
        r.nombre,
        r.apellido,
        r.folio,
        r.folio_ext,
        r.procedencia,
        r.agencia,
        ingreso_renta,
        total_bruto
      ]
    );

    res.status(200).json({ mensaje: 'Reserva registrada correctamente', tarifa, noches, ingreso_renta });

  } catch (error) {
    console.error('Error al registrar reserva:', error);
    res.status(500).json({ error: 'Error al registrar la reserva' });
  }
});


export default router;

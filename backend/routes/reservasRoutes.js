import express from 'express';
import pool from '../db.js';

const router = express.Router();

router.get('/siguiente-folio', async (req, res) => {
  try {
    const [results] = await pool.query(`SELECT folio FROM reservas ORDER BY id_reserva DESC LIMIT 1`);

    let nuevoFolio = 'R1000';
    if (results.length > 0) {
      const ultimoFolio = results[0].folio;
      const numero = parseInt(ultimoFolio.replace(/\D/g, ''), 10) + 1;
      nuevoFolio = `R${numero}`;
    }

    const nuevoFolioExt = `EXT-${nuevoFolio}`;
    res.json({ folio: nuevoFolio, folio_ext: nuevoFolioExt });
  } catch (err) {
    console.error('Error al obtener folio:', err);
    res.status(500).json({ error: 'Error al obtener folio' });
  }
});


// Crear nueva reserva
router.post('/', async (req, res) => {
  const r = req.body;
  try {
    // 1. Consultar tarifa de la habitación
    const [habitacion] = await pool.query(
      'SELECT id_habitacion, tarifa, tipo FROM habitaciones WHERE numero = ?',
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
    llegada.setHours(0, 0, 0, 0);
    salida.setHours(0, 0, 0, 0);

    const diffTime = salida - llegada;
    const noches = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    const ingreso_renta = parseFloat(((tarifa * noches) / 1.19).toFixed(2));
    const cargo_extra = r.cargo_extra || 0;
    const total_bruto = (tarifa * noches) + cargo_extra;

    // 3. Insertar reserva
    await pool.query(
      `INSERT INTO reservas (
        id_habitacion, llegada, salida, personas, tarifa, estado, comentarios,
        saldo, nombre, apellido, folio, folio_ext, procedencia, agencia, ingreso_renta, cargo_extra, total_bruto
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
        cargo_extra,
        total_bruto
      ]
    );

    res.status(200).json({ mensaje: 'Reserva registrada correctamente', tarifa, noches, ingreso_renta });

  } catch (error) {
    console.error('Error al registrar reserva:', error);
    res.status(500).json({ error: 'Error al registrar la reserva' });
  }
});

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        r.id_reserva,
        r.nombre,
        r.apellido,
        h.numero AS habitacion,  -- Traer el número de habitación
        r.folio,
        r.folio_ext,
        r.procedencia,
        r.agencia,
        r.llegada,
        r.salida,
        r.personas,
        r.tarifa,
        r.saldo,
        r.ingreso_renta,
        r.total_bruto
      FROM reservas r
      INNER JOIN habitaciones h ON r.id_habitacion = h.id_habitacion
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener reservas:', error);
    res.status(500).json({ error: 'Error al obtener reservas' });
  }
});




export default router;

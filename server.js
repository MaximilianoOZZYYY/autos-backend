process.on('uncaughtException', err => { console.error('ERROR:', err); process.exit(1); });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
 
const app = express();
app.use(express.json());
app.use(cors());
 
// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conexión exitosa a MongoDB Atlas'))
  .catch(err => console.error('Error de conexión:', err));
 
// Esquema NoSQL — Catálogo de Autos
const AutoSchema = new mongoose.Schema({
  marca: String,
  modelo: String,
  anio: Number,
  precio: Number,
  color: String
});
const Auto = mongoose.model('Auto', AutoSchema);
 
// GET: Obtener todos los autos
app.get('/autos', async (req, res) => {
  const autos = await Auto.find();
  res.json(autos);
});
 
// POST: Registrar un nuevo auto
app.post('/autos', async (req, res) => {
  const nuevoAuto = new Auto(req.body);
  await nuevoAuto.save();
  res.json({ mensaje: 'Auto registrado', nuevoAuto });
});
 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor activo en puerto ${PORT}`));
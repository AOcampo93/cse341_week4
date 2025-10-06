// server.js
const express = require('express');
const cors = require('cors');
const mongodb = require('./db/connect');

const swaggerUi = require('swagger-ui-express');
const rawSpec = require('./swagger.json');

const port = process.env.PORT || 8080;
const app = express();

/* ---------- Middlewares globales ---------- */
app.use(express.json()); // reemplaza body-parser.json()
app.use(cors({
  origin: true, // puedes restringir a ['https://TU-APP.onrender.com']
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.options('*', cors()); // responde preflights

/* ---------- Swagger UI con spec dinámico ---------- */
// servir assets de Swagger UI
app.use('/api-docs', swaggerUi.serve);

// ajustar host/esquema según la request (Render vs local)
app.use('/api-docs', (req, res, next) => {
  const spec = JSON.parse(JSON.stringify(rawSpec)); 
  spec.host = req.get('host');      
  spec.schemes = [req.protocol];    
  return swaggerUi.setup(spec)(req, res, next);
});

// (Opcional) Ver el JSON ya ajustado
app.get('/api-docs.json', (req, res) => {
  const spec = JSON.parse(JSON.stringify(rawSpec));
  spec.host = req.get('host');
  spec.schemes = [req.protocol];
  res.json(spec);
});

/* ---------- Rutas de la API ---------- */
app.use('/', require('./routes'));

/* ---------- DB & server ---------- */
mongodb.initDb((err) => {
  if (err) {
    console.error('DB init error:', err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on ${port}`);
    });
  }
});

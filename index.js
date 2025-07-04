const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const routes = require('./src/routes/main');
const swaggerSpec = require('./config/swagger');

const app = express();
dotenv.config();

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware et CORS
app.use(cors({
  origin: ["http://localhost:5100", "http://localhost:4200"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/api', routes);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Démarrage serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server launched on http://localhost:${PORT}`);
});

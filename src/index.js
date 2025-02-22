const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const { syncDatabase, testDbConnexion } = require('./models');
const userRoutes = require('./routes/userRoutes');
const egopassRoutes = require('./routes/egopassRoutes');
const travelersRoutes = require('./routes/travelersRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();
testDbConnexion();
syncDatabase();

app.use(express.json());

// Users routes
app.use('/api/users', userRoutes);

// EGoPASS transactions routes
app.use('/api/egopass', egopassRoutes);

// Travels routes
app.use('/api/travels', travelersRoutes);

// Swagger UI
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware de gestion des erreurs pour les routes et middlewares d'Express
app.use(errorHandler);

module.exports = app;

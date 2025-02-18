const express = require('express');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorHandler');
const { testDbConnexion } = require('./middlewares/dbTestingConnect');

const app = express();
testDbConnexion();

// Middleware pour parser le JSON
app.use(express.json());

// Exemple d'ajout d'une route (à compléter selon vos besoins)
app.use('/api/users', userRoutes);

// Middleware de gestion des erreurs pour les routes et middlewares d'Express
app.use(errorHandler);

module.exports = app;

const swaggerJSDoc = require('swagger-jsdoc');
const dotenv = require('dotenv');

dotenv.config();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'e-GoPass API',
      version: '1.0.0',
      description: 'Documentation de l’API e-GoPass',
    },
    servers: [
      {
        url: `${process.env.SWAGGER_PROXY_HOST}`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{
      bearerAuth: []
    }],
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;

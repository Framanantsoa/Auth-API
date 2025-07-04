require('dotenv').config();
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Authentification',
      version: '1.0.0',
      description: 'Documentation de l\'API Express (signup/login)',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}/api`,
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Fichier contenant les annotations Swagger
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;

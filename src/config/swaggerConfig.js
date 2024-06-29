import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';


const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Rent House API',
      version: '1.0.0',
      description: 'API para gerenciamento de aluguel de casas',
    },
  },
  apis: ['../routes.js'],
 };

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };

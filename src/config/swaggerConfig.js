import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from'swagger-ui-express'

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Exemplo API',
      version: '1.0.0',
      description: 'Descrição da API',
    },
  },
  apis: ['./controllers/**/*.js'], 
};

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };

// swagger.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'CSE341 API - Week 4',
    description: 'Contacts API'
  },
  // No se define host ni schemes: Swagger UI usará el origen actual (Render o localhost)
  basePath: '/',
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    { name: 'Contacts', description: 'Operations for contacts' }
  ],
  definitions: {
    Contact: {
      firstName: 'Arturo',
      lastName: 'Ocampo',
      email: 'arturo@example.com',
      favoriteColor: 'Blue',
      birthday: '1990-05-20'
    },
    ContactInput: {
      $firstName: 'Arturo',
      $lastName: 'Ocampo',
      $email: 'arturo@example.com',
      favoriteColor: 'Blue',
      birthday: '1990-05-20'
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);

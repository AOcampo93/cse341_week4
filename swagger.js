// swagger.js
const swaggerAutogen = require('swagger-autogen')();

const isProd = process.env.NODE_ENV === 'production';

const doc = {
  info: {
    title: 'CSE341 API - Week 4',
    description: 'Contacts API'
  },
  host: isProd ? 'cse341-week4-4b58.onrender.com' : 'localhost:8080',
  schemes: [isProd ? 'https' : 'http'],
  basePath: '/',
  consumes: ['application/json'],
  produces: ['application/json']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// Genera swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

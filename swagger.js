import swaggerAutogen from 'swagger-autogen';
import path from 'path';

const outputFile = path.join('docs', 'swagger.json'); // Where swagger.json will be generated
const endpointsFiles = [
  './src/server.js',
  './src/routes/recipesRoutes.js',
  './src/routes/categoriesRoutes.js',
  './src/routes/ingredientsRoutes.js',
  './src/routes/authRoutes.js',
  './src/routes/userRoutes.js',
];

const doc = {
  info: {
    title: 'YumYum API',
    description: 'API documentation for YumYum app',
  },
  host: 'localhost:3001',
  schemes: ['http'],
};

swaggerAutogen()(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger documentation generated successfully!');
});

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

swaggerAutogen()(outputFile, endpointsFiles).then(() => {
  console.log('Swagger documentation generated successfully!');
});

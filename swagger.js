import swaggerAutogen from 'swagger-autogen';
import path from 'path';

const outputFile = path.resolve(process.cwd(), 'docs', 'swagger.json');
const endpointsFiles = [
  './src/server.js',
  './src/routes/recipesRoutes.js',
  './src/routes/categoriesRoutes.js',
  './src/routes/ingredientsRoutes.js',
  './src/routes/authRoutes.js',
  './src/routes/userRoutes.js',
];

const swagger = swaggerAutogen();
swagger(outputFile, endpointsFiles).then(() => {
  console.log('Swagger documentation generated successfully!');
});

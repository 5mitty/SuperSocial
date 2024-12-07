import express from 'express';
import routes from './routes/index.js'; // Ensure this path is correct
import db from './config/connection.js';
import seedDatabase from './seeds/index.js'; // Import the seed function

const app = express();
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  // Connect to the database
  await db();

  // Seed the database
  await seedDatabase();

  // Middleware to parse JSON
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Use the routes defined in index.js
  app.use('/api', routes);

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/api`);
  });
};

// Call the startServer function to initiate the server
startServer().catch(err => {
  console.error('Failed to start the server:', err);
});
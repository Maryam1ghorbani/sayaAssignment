//import { request, response } from 'express';
import bodyParser from 'body-parser';
import { db } from './src/database/connection';
import userRoutes from './src/routes/main.route';
import { loadConfig } from './src/config/configLoader';
import express from 'express';

const app = express();
const port = loadConfig().app.port;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);

db.then(() => {
  app.listen(port, () =>
    console.log(`server running at http://localhost:${port}`),
  );
});

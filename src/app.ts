import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api', routes);

export default app;

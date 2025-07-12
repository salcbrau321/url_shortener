import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import linkRoutes from './routes/linkRoutes';

const app = express();

app.use(express.json());
app.use('/', linkRoutes);
app.use(errorHandler);

export default app;

import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import linkRoutes from './routes/linkRoutes';
import cors from 'cors';

const app = express();

//app.use(cors());
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    optionsSuccessStatus: 200
}));
app.use(express.json());
app.use('/', linkRoutes);
app.use(errorHandler);

export default app;

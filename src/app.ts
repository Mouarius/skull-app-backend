import express from 'express';
//* UTILS & CONFIG
import cors from 'cors';
import morgan from 'morgan';
import { errorHandler, unknownEndpoint } from './util/middleware';

//* MODELS, ROUTES, SERVICES
import gamesRouter from './controllers/games';
import playersRouter from './controllers/players';

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('short'));
app.use('/api/games', gamesRouter);
app.use('/api/players', playersRouter);
app.use(unknownEndpoint);
app.use(errorHandler);

export default app;

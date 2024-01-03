import express from 'express';
import { enableCors } from './config/plugins/cors.js';
import { globalErrorHandler } from './common/errors/error.controller.js';
import { AppError } from './common/errors/appError.js';
import { router } from './routes/index.js';
import { limitRequest } from './config/plugins/rate-limit.plugin.js';
import helmet from 'helmet';
import hpp from 'hpp';
import sanitizer from 'perfect-express-sanitizer';

const app = express();

const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  //agregar los origenes aceptados
];
const rateLimit = limitRequest(
  100,
  60,
  'Too many request from this IP, please try again in a hour.'
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimit);
app.use(helmet());
app.use(hpp());
app.use(
  sanitizer.clean({
    xss: true,
    noSQL: true,
    sql: false,
  })
);

enableCors(app, ACCEPTED_ORIGINS);

//definir rutas
app.use('/api/v1', router);

app.all('*', (req, res, next) => {
  return next(new AppError(`${req.originalUrl} not found`, 404));
});

app.use(globalErrorHandler);

export default app;

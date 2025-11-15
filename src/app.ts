import express from 'express';
import helmet from 'helmet';
import healthRouter from './routes/health';
import logger from './logger';
import expressPino from 'express-pino-logger';
import metricsRegister, {httpRequestDurationSeconds} from './metrics';
import {Request, Response, NextFunction} from 'express';

const app = express();

app.use(helmet());
app.use(express.json());
app.use(expressPino({logger}));

// metrics middleware: measure each request
app.use((req: Request, res: Response, next: NextFunction) => {
  const end = httpRequestDurationSeconds.startTimer();
  res.on('finish', () => {
    end({method: req.method, route: req.route?.path || req.path, code: res.statusCode});
  });
  next();
});

app.use('/api/health', healthRouter);

// expose /metrics for Prometheus scraping
app.get('/metrics', async (_req: Request, res: Response) => {
  res.setHeader('Content-Type', metricsRegister.contentType);
  res.send(await metricsRegister.metrics());
});

// Basic error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  logger.error({err}, 'Unhandled error');
  res.status(500).json({error: 'Internal Server Error'});
});

export default app;

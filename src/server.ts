import app from './app';
import logger from './logger';

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  logger.info({port}, `Server listening on ${port}`);
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down');
  server.close(() => process.exit(0));
});

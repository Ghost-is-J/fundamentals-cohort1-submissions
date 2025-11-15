import client from 'prom-client';

const register = client.register;
const collectDefaultMetrics = client.collectDefaultMetrics;

collectDefaultMetrics({register});

export const httpRequestDurationSeconds = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.005, 0.01, 0.05, 0.1, 0.5, 1, 2, 5]
});

export default register;

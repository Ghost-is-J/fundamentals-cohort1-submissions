import request from 'supertest';
import app from '../src/app';

describe('GET /api/health', () => {
  it('responds with status ok and version', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
    expect(res.body).toHaveProperty('version');
  });
});

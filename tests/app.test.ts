import request from 'supertest';
import app from '../src/app';

describe('Integration tests', () => {
  it('GET / - should returns status 200 and message "Ok"', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Ok');
  });

  it('GET /test - should returns status 404 and message "Route not Found', async () => {
    const response = await request(app).get('/test');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Route not Found' });
  });
});

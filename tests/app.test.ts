import request from 'supertest';
import app from '../src/app';

describe('Testes de integração do app', () => {
  it('GET / - deve retornar status 200 e texto "Ok"', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Ok');
  });

  it('GET /test - deve retornar 404 com mensagem de rota não encontrada', async () => {
    const response = await request(app).get('/test');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Route not Found' });
  });
});

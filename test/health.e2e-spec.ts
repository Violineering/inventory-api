import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module.js';

describe('Health (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('GET /health returns 200 with status "ok"', async () => {
    const res = await request(app.getHttpServer()).get('/health').expect(200);

    expect(res.body.status).toBe('ok');
  });

  it('GET /health responds with JSON', async () => {
    await request(app.getHttpServer())
      .get('/health')
      .expect('Content-Type', /application\/json/);
  });

  it('GET /health reports uptime in seconds', async () => {
    const res = await request(app.getHttpServer()).get('/health');

    expect(typeof res.body.uptime).toBe('number');
    expect(res.body.uptime).toBeGreaterThanOrEqual(0);
  });

  it('the sample "Hello World" route has been removed', async () => {
    await request(app.getHttpServer()).get('/').expect(404);
  });
});

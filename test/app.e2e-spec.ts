import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { faker } from '@faker-js/faker';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/discounts/1', async () => {
    let res = await request(app.getHttpServer()).get('/discounts/123');
    expect(res.statusCode).toEqual(400);
  });
  it('should be sign up', async () => {
    let username = faker.internet.userName();
    let password = faker.internet.password();
    console.log('test sign up:', { username, password });

    let res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ username, password });

    console.log(res.body);
    expect(res.statusCode).toEqual(201);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { faker } from '@faker-js/faker';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should be sign up', async () => {
    let username = faker.internet.userName();
    let password = faker.internet.password();
    console.log('test sign up:', { username, password });

    let res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ username, password });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should be login', async () => {
    let body = { username: 'Mittie99', password: 'yYqFA0wl432dStu' };

    let res = await request(app.getHttpServer()).post('/auth/login').send(body);
    console.log(res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});

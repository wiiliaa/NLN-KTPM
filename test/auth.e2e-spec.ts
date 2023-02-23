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

  it('should be login corrent', async () => {
    let body = { username: 'Mittie99', password: 'yYqFA0wl432dStu' };
    let res = await request(app.getHttpServer()).post('/auth/login').send(body);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('accessToken');
  });

  it('should valid login wrong username', async () => {
    let body = { username: 'Mittie99_woring', password: 'yYqFA0wl432dStu' };
    let res = await request(app.getHttpServer()).post('/auth/login').send(body);
    expect(res.statusCode).toEqual(401);
  });

  it('should valid login wrong password', async () => {
    let body = { username: 'Mittie99', password: 'yYqFA0wl432dStu_wrong' };
    let res = await request(app.getHttpServer()).post('/auth/login').send(body);
    expect(res.statusCode).toEqual(401);
  });

  it('should valid login wrong username & password', async () => {
    let body = { username: 'Mittie99', password: 'yYqFA0wl432dStu_wrong' };
    let res = await request(app.getHttpServer()).post('/auth/login').send(body);
    expect(res.statusCode).toEqual(401);
  });

  it('should be faild authorizated', async () => {
    const accessToken = '12123123';
    const resLogined = await request(app.getHttpServer())
      .get('/auth/user')
      .set({ Authorization: `Bearer ${accessToken}` });
    expect(resLogined.statusCode).toEqual(401);
  });

  it('should be corrent authorization', async () => {
    const body = { username: 'Mittie99', password: 'yYqFA0wl432dStu' };
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send(body);
    const { accessToken } = res.body;
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('accessToken');

    const resLogined = await request(app.getHttpServer())
      .get('/auth/user')
      .set({ Authorization: `Bearer ${accessToken}` });
    const { user } = resLogined.body;
    expect(resLogined.statusCode).toEqual(200);
    expect(user).toHaveProperty('id');
    expect(user.username).toEqual(body.username);
  });
});

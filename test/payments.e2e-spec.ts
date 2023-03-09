import { faker } from '@faker-js/faker';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  it('/payments (POST)', () => {
    const createPaymentDto = {
      name: faker.name.firstName(),
      paymentcode: faker.random.alpha(2),
      note: 'NOTE',
    };
    return request(app.getHttpServer())
      .post('/payments')
      .send(createPaymentDto)
      .expect(201);
  });
});

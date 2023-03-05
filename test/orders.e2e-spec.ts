import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { faker } from '@faker-js/faker';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/orders (POST)', () => {
    let createOrderDto = {
      ordercode: faker.random.numeric(2),
      note: faker.random.words(),
      date: faker.date.past(),
      discount: {
        id: 4,
      },
      payment: {
        id: 1,
      },
      orderDetails: [
        {
          qty: 2,
          product: {
            id: 1,
          },
        },
        {
          qty: 2,
          product: {
            id: 2,
          },
        },
      ],
    };
    return request(app.getHttpServer())
      .post('/orders')
      .send(createOrderDto)
      .expect(201);
  });
});

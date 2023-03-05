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

  it('/orders (POST)', async () => {
    const accessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRoaWVudGhhbyIsImlhdCI6MTY3Nzk5MjYzNiwiZXhwIjoxNjc3OTk2MjM2fQ.YuGJGbv7drGA11wVwDHkNyHHY7r4ornFJYe6SaHG6fA';
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
          qty: 231,
          product: 1,
        },
        {
          qty: 2,
          product: 2,
        },
        {
          qty: 512,
          product: 4,
        },
      ],
    };
    const res = await request(app.getHttpServer())
      .post('/orders')
      .send(createOrderDto)
      .set({ Authorization: `Bearer ${accessToken}` });
    expect(res.status).toEqual(201);
  });
});

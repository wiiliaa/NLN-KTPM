import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { faker } from '@faker-js/faker';
import { CreateDiscountDto } from '@src/discounts/dto/create-discount.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  it('/discounts/:id test non-exist', async () => {
    const idRandom = faker.random.numeric(5);
    let res = await request(app.getHttpServer()).get(`/discounts/${idRandom}`);
    expect(res.statusCode).toEqual(400);
  });
  it('/discounts/:id test existed', async () => {
    let res = await request(app.getHttpServer()).get('/discounts/3');
    expect(res.statusCode).toEqual(200);
  });
  it('POST /discounts', async () => {
    const createDiscountDto: CreateDiscountDto = {
      coupon: faker.random.word(),
      limit: +faker.random.numeric(2),
      percent: +faker.random.numeric(2),
      start: faker.date.future(),
      end: faker.date.future(10),
      note: faker.random.words(5),
    };

    const res = await request(app.getHttpServer())
      .post('/discounts')
      .send(createDiscountDto);
    expect(res.statusCode).toEqual(201);
  });
});

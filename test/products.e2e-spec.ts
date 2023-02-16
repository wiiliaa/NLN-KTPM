import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { faker } from '@faker-js/faker';
import { CreateProductDto } from '@src/products/dto/create-product.dto';

describe('ProductsController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/products', async () => {
    //faker: random data
    let createProductDto: CreateProductDto = {
      name: faker.name.jobTitle(),
      description: faker.name.jobTitle(),
      price: +faker.random.numeric(3),
      width: +faker.random.numeric(2),
      height: +faker.random.numeric(2),
      weight: +faker.random.numeric(2),
    };
    let res = await request(app.getHttpServer())
      .post('/products')
      .send(createProductDto);
    console.log(res.body);
    expect(res.statusCode).toEqual(201);
  });
});

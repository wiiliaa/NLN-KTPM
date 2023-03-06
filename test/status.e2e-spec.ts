import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateStatusDto } from '@src/status/dto/create-status.dto';
import { faker } from '@faker-js/faker';

describe('StatusController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/status (POST)', () => {
    let createStatusDto: CreateStatusDto = {
      name: faker.name.jobDescriptor(),
      target: 'USER',
      description: faker.word.noun({ length: 12 }),
    };
    return request(app.getHttpServer())
      .post('/status')
      .send(createStatusDto)
      .expect(201);
  });
});

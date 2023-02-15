import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { DiscountsController } from './discounts.controller';
import { DiscountsService } from './discounts.service';

describe('DiscountsController', () => {
  let controller: DiscountsController;
  let app: INestApplication;
  const idNonExist = 9999999;
  const router = '/discounts';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiscountsController],
      providers: [
        {
          provide: DiscountsService,
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    controller = module.get<DiscountsController>(DiscountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it(`should ${router} (Get) statusCode 200`, () => {
    return request(app.getHttpServer()).get(router).expect(200);
  });

  it(`should ${router}/${idNonExist} badRequest non-exist`, async () => {
    let res = await request(app.getHttpServer()).get('/discounts/123123x');
    console.log(res.body);
    expect(res.statusCode).toEqual(400);
  });
});

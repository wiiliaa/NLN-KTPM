import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import * as request from 'supertest';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();
    app = module.createNestApplication();
    await app.init();
    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('/products (GET)', () => {
    return request(app.getHttpServer()).get('/products').expect(200);
  });
  it('/products/1 (GET)', () => {
    return request(app.getHttpServer()).get('/products/1').expect(404);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ProductMetasController } from './product_metas.controller';

describe('ProductMetasController', () => {
  let controller: ProductMetasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductMetasController],
    }).compile();

    controller = module.get<ProductMetasController>(ProductMetasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

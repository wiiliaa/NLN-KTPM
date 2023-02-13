import { Test, TestingModule } from '@nestjs/testing';
import { ProductMetasService } from './product_metas.service';

describe('ProductMetasService', () => {
  let service: ProductMetasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductMetasService],
    }).compile();

    service = module.get<ProductMetasService>(ProductMetasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

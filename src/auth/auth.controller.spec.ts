import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import * as request from 'supertest';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let app: INestApplication;

  beforeEach(async () => {
    let module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn(),
            signUp: jest.fn(),
          },
        },
      ],
    })
      .overrideProvider(AuthService)
      .useValue(AuthService)
      .compile();
    app = module.createNestApplication();
    await app.init();
    controller = module.get<AuthController>(AuthController);
  });

  it('should be sign up', () => {
    let username = faker.internet.userName();
    let password = faker.internet.password();
    console.log('test sign up:', { username, password });

    request(app.getHttpServer())
      .post('/auth/signup')
      .send({ username, password })
      .expect(200);
  });
});

import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import * as request from 'supertest';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { createConnection, getConnection, Repository } from 'typeorm';
import { typeOrmConfig } from '@src/config/TypeOrm.config';
import { Order } from '@src/orders/order.entity';
import { Payment } from '@src/payments/payments.entity';
import { PaymentOrder } from '@src/payment_orders/payment_orders.entity';
import { Status } from '@src/status/status.entity';
import { OrderDetail } from '@src/order_details/order_details.entity';

describe('AuthController', () => {
  let controller: AuthController;
  let app: INestApplication;
  const testConnectionName = 'testConnection';

  beforeEach(async () => {
    let module = await Test.createTestingModule({
      imports: [
        PassportModule.register({
          defaultStrategy: 'jwt',
        }),
      ],
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
    }).compile();

    let connection = await createConnection({
      host: '167.99.76.106',
      port: 5432,
      username: 'postgres',
      password: '123456789zZ@x',
      type: 'postgres',
      database: 'nhom10',
      //dropSchema: true,
      //  entities: [User, Order, Payment, PaymentOrder, Status, OrderDetail],
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      synchronize: true,
      logging: false,
      name: testConnectionName,
    });
    app = module.createNestApplication();
    await app.init();
    controller = module.get<AuthController>(AuthController);
    return connection;
  });
  afterEach(async () => {
    await getConnection(testConnectionName).close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be sign up', async () => {
    let username = faker.internet.userName();
    let password = faker.internet.password();
    console.log('test sign up:', { username, password });

    let res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ username, password });

    console.log(res.body);
    expect(res.statusCode).toEqual(201);
  });
});

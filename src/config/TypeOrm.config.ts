import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: '167.99.76.106',
  port: 5432,
<<<<<<< HEAD
  username: "postgres",
  password: "123456789zZ@x",
  database: "nhom10_test",
  entities: [__dirname + "/../**/*.entity.{js,ts}"],
=======
  username: 'postgres',
  password: '123456789zZ@x',
  database: 'nhom10',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
>>>>>>> tthao123/feature/update-order
  synchronize: true,
  logging: true,
};

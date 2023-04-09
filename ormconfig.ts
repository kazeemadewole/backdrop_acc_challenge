import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ConfigService } from '@nestjs/config';
import 'dotenv/config';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const appConfig = new ConfigService();
const ENV = {
  NODE_ENV: appConfig.get<string>('NODE_ENV'),
  DB_PORT: appConfig.get<number>('DB_PORT'),
  DB_HOST: appConfig.get<string>('DB_HOST'),
  DB_USERNAME: appConfig.get<string>('DB_USERNAME'),
  DB_PASSWORD: appConfig.get<string>('DB_PASSWORD'),
  DB_NAME: appConfig.get<string>('DB_NAME'),
};

const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME, NODE_ENV, DB_PORT } = ENV;
console.log(`****** application node is ${NODE_ENV}`);

const ormConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true, // to use migration for production
  logging: false,
  migrationsRun: true,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migration/*.js'],
  namingStrategy: new SnakeNamingStrategy(),
  subscribers: [],
};

export const datasource = new DataSource(ormConfig);

export default ormConfig;

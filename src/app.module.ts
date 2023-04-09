import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { BaseModule } from './base/base.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from '../ormconfig';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { BankModule } from './bank/bank.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(ormConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      introspection: true,
      playground: true,
    }),
    BaseModule,
    UserModule,
    BankModule,
  ],
  providers: [],
})
export class AppModule {}

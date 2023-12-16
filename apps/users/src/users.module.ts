import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
//Importamos lo que usaremos para GraphQl y apollo
import { GraphQLModule } from '@nestjs/graphql';
import {ApolloFederationDriver, ApolloFederationDriverConfig, } from '@nestjs/apollo';

@Module({
  //Importamos el modulo de GraphQL y agremos los drivers para usar apollo 2
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
  ],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}

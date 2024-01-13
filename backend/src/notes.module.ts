import path from 'node:path';
import {Module} from '@nestjs/common';
import {RestController} from './rest.controller';
import {DatabaseService} from './database.service';
import {GraphQLModule} from '@nestjs/graphql';
import {ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo';
import { GraphqlResolver } from './graphql.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      path: '/api/graphql',
      include: [NotesModule],
      typePaths: [path.resolve(process.cwd(), 'src/schema.graphql')]
    })
  ],
  controllers: [RestController],
  providers: [DatabaseService, GraphqlResolver]
})
export class NotesModule {}

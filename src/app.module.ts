import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DocumentsModule } from './documents/documents.module';

import 'dotenv/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { LoggingMiddleware } from './logger/logger.middleware';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_STRING_CONNECTION),
    AuthModule,
    DocumentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}

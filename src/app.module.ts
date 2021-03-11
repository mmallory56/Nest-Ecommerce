import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UploadsModule } from './uploads/uploads.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';


@Module({
  imports: [
    UsersModule,
    ProductModule,
    ConfigModule.forRoot({
      envFilePath:'.env'
    }), 
     MongooseModule.forRoot(process.env.MongoDbCluster, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }), UploadsModule, AuthModule, EmailModule
  ],
  controllers: [AppController ],
  providers: [AppService],
})
export class AppModule {}

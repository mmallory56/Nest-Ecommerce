import { Module } from '@nestjs/common';
import { ProductService } from './Services/product.service';
import { ProductController } from './controllers/product.controller';

import { Product, ProductSchema } from 'src/product/Models/schema/product.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    AuthModule,
    JwtAuthGuard,
   
  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}

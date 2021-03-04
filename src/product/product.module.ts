import { Module } from '@nestjs/common';
import { ProductService } from './Services/product.service';
import { ProductController } from './controllers/product.controller';

import { Product, ProductSchema } from 'src/product/Models/schema/product.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{name:Product.name,schema:ProductSchema}])],
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule {}

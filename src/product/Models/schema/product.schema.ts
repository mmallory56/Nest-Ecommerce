import {Prop,Schema,SchemaFactory} from '@nestjs/mongoose'
import {Document} from 'mongoose'
import {ProductInterface} from '../interfaces/ProductInterface'


export type ProductDocument = Product & Document;


@Schema()
export class Product implements ProductInterface {
    
  @Prop({ required: true })
  title: string;
  @Prop({ required: false })
  description: string;
  @Prop({ required: true })
  price: Number;
  @Prop({ required: false })
  image: string;
  @Prop({ required: false })
  category?: string;
  @Prop({ required: false })
  rating: number;
  @Prop({ required: false })
  ratings: number;


}


export const ProductSchema = SchemaFactory.createForClass(Product)
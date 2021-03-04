import {Prop,Schema,SchemaFactory} from '@nestjs/mongoose'
import {Document} from 'mongoose'
import {ProductInterface} from '../interfaces/ProductInterface'


export type ProductDocument = Product & Document;


@Schema()
export class Product implements ProductInterface{
    @Prop()
    title: string;
    @Prop()
    price: Number;

}


export const ProductSchema = SchemaFactory.createForClass(Product)
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../Models/schema/product.schema';

@Injectable()
export class ProductService {

    constructor(@InjectModel(Product.name) private productModel:Model<ProductDocument>){}
    //Get All Products
    async getProducts(){
        const products = await this.productModel.find();
        
        return products;
    }
    //Get All Top Reviewed Products
    getTopProduct(){

    }
    //Create A Product
   async createProduct(id:string,product:Product){
       try{
            const createProduct =  this.productModel.create(product)
        const savedProduct = await (await createProduct).save();
        return savedProduct;
       }
       catch(err)
       {
           return err;
       }
       
    }
    //Delete a Product
    async deleteProduct(id:string){
       try{
           
        const deleteProduct = await this.productModel.findById({_id:id});
        if(deleteProduct){
           await this.productModel.deleteOne({_id:id}) 
           return "product found"
        }else{
            return "Product Doesn't exist"
        }
       
    
    } catch(error){
        return error;
    }

       
    }
    //Edit A Product
    async editProduct(id:string,product:Product){
        try{
            const editProduct = await this.productModel.findById(id);
            if(editProduct){
               editProduct.title = product.title || editProduct.title
               editProduct.price = product.price || editProduct.price;
               const finaledit =await editProduct.save();
               return finaledit;
            }
            else{
                return "Did not find object"
            }
        }
        catch(err){
            return err
        }
    }

    

}

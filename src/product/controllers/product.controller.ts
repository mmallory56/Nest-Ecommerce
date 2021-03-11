import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Product } from 'src/product/Models/schema/product.schema';
import { ProductService } from '../services/product.service';

//Handles Product Crud Operations
@Controller('api')
export class ProductController {
    constructor(private readonly productService:ProductService){}
    //Return All the Products 
    @Get("products")
    async getProducts(){
        
        return this.productService.getProducts() ;
    }

    //Get the Products With The highest Reviews
    @Get("/topProducts")
    async getTopProducts(){
        return "Top Products"
    }
    //get product by ID
    @Get("product/:id")
    async getProductById(@Param("id") productId:string){
        return "Single Product By ID"
    }
    //Update Product
    @Put("product/:id")
    async updateProduct(@Param("id") id:string,@Body('product')product:Product){
        return this.productService.editProduct(id,product)
    }
    //Create New Product
    @Post("product/create")
    async createProduct(@Param('id' )productId:string,@Body("product") createProduct:Product){
        return this.productService.createProduct(productId,createProduct);
    }
    //Delete Product by Id
    @Delete('product/:id')
    async deleteProduct(@Param('id')productId:string){
        return this.productService.deleteProduct(productId);
    }
    //Add Product Review to product can be isolate into another controller? 
    @Post('product/:id/review')
    async createReview(@Param("id")productId:string){
        return "Create Product Review on Product "+productId;
    }

}

import { throwStatement } from '@babel/types';
import { Controller,Get,Post,Put,Delete, Res, HttpStatus, Body, Param, NotFoundException,Query } from '@nestjs/common';
import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService){}

    @Post('/create')
    async createProduct(@Res() res,@Body() createProductDTO : CreateProductDTO){
        const product = await this.productService.createProduct(createProductDTO)
       return res.status(HttpStatus.OK).json({
            message: 'Product Successfully Created',
            product
        })
    }

    @Get('/')
    async getProducts(@Res() res){
       const products = await this.productService.getProducts();
       return res.status(HttpStatus.OK).json({
           message : 'Product list',
           products
       })
    }

    @Get('/:productID')
    async getProduct(@Res() res, @Param('productID') productID){
        const product =  await this.productService.getProduct(productID);
        if (!product) throw new NotFoundException('Product does not exist');
        return res.status(HttpStatus.OK).json(product);
    }

    @Delete('/delete') 
    async deleteProduct(@Res() res, @Query('productID') productID ){
        const deletedProduct =  await this.productService.deleteProduct(productID);
        if(!deletedProduct) throw new NotFoundException('Product does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Product deleted successfully',
            deletedProduct});
    }

    @Put('/update')
    async updateProduct(@Res() res,@Body() createdProductDTO: CreateProductDTO,@Query('productID') productID ){
        const updatedProduct =  await this.productService.updateProduct(productID,createdProductDTO);
        if(!updatedProduct) throw new NotFoundException('Product does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Product updated successfully',
            updatedProduct
        })

    }
}

import { throwStatement } from '@babel/types';
import { Controller,Get,Post,Put,Delete, Res, HttpStatus, Body, Param, NotFoundException,Query } from '@nestjs/common';
import { CreateArticleDTO } from './dto/article.dto';
import { ArticleService } from './article.service';
@Controller('article')
export class ArticleController {

    constructor(private articleService: ArticleService){}
   

    @Post('/create')
    async createArticle(@Res() res,@Body() createArticleDTO : CreateArticleDTO){
        const article = await this.articleService.createArticle(createArticleDTO)
       return res.status(HttpStatus.OK).json({
            message: 'Product Successfully Created',
            article
        })
    }

    @Get('/')
    async getArticles(@Res() res){
       console.log('entro a getArtcles') 
       const articles = await this.articleService.getArticles();
       return res.status(HttpStatus.OK).json({
           message : 'Product list',
           articles
       })
    }

    @Get('/:articleID')
    async getArticle(@Res() res, @Param('articleID') articleID){
        const article =  await this.articleService.getArticle(articleID);
        if (!article) throw new NotFoundException('Article does not exist');
        return res.status(HttpStatus.OK).json(article);
    }

    @Delete('/delete') 
    async deleteArticle(@Res() res, @Query('articleID') articleID ){
        const deletedArticle =  await this.articleService.deleteArticle(articleID);
        if(!deletedArticle) throw new NotFoundException('Article does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Article deleted successfully',
            deletedArticle});
    }

    @Put('/update')
    async updateArticle(@Res() res,@Body() createArticleDTO: CreateArticleDTO,@Query('articleID') articleID ){
        const updatedArticle =  await this.articleService.updateArticle(articleID,createArticleDTO);
        if(!updatedArticle) throw new NotFoundException('Article does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Article updated successfully',
            updatedArticle
        })

    }
}

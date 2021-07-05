import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from './interfaces/article.interface';
import { CreateArticleDTO } from './dto/article.dto';

@Injectable()
export class ArticleService {
  constructor(@InjectModel('Article') private readonly articleModel: Model<Article>){}

  async getArticles(): Promise<Article[]>{
    const articles = await this.articleModel.find();
    return articles;
  }

  async getArticle(articleId: string): Promise<Article>{
    const article = await this.articleModel.findById(articleId);
    return article;
  }

   async createArticle(createArticleDTO: CreateArticleDTO): Promise<Article>{
      const article =   new this.articleModel(createArticleDTO);
      return await article.save();

  }

   async deleteArticle(articleId: string): Promise<Article>{
      console.log('articleId: ',articleId)
      const deletedArticle = await this.articleModel.findByIdAndDelete(articleId)
      return deletedArticle; 
  }

   async updateArticle(articleId :string , createArticleDTO : CreateArticleDTO) : Promise<Article>{
     const updatedArticle = await this.articleModel.findByIdAndUpdate(articleId,createArticleDTO,{new:true});
     return updatedArticle;
  }

}

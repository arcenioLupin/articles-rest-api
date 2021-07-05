import { Injectable,Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CreateArticleDTO } from './article/dto/article.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ArticleApi } from './article/interfaces/article-api.interfaces';  
const fetch = require('node-fetch');
@Injectable()
export class AppService {

  constructor(@InjectModel('Article') private readonly articleModel: Model<ArticleApi>){}
  private readonly logger = new Logger(AppService.name);

  getHello(): string {
    return 'Hello World!';
  }

  @Cron('0 55 * * * *')
   handleCron() {
    this.borrarAllDocuments()

    fetch('https://hn.algolia.com/api/v1/search_by_date?query=nodejs')
    .then(res => res.json())
    .then (json => 
       {
        let articles = json.hits
        articles.map(article =>{
         let createArticleDTO = {
             title : article.title,
             storyTitle: article.story_title,
             author: article.author,
             createdAt: article.created_at,
             storyUrl: article.story_url
         }         
          this.insertArticle(createArticleDTO)
                   
        })
       }
      
      ); 
    this.logger.debug('Called when the current minute is 55');
  }

  async insertArticle(createArticleDTO : CreateArticleDTO){  
    const article =   new this.articleModel(createArticleDTO);
    return await article.save();
  }

   async borrarAllDocuments(){
     console.log("Cleaning collection")
     return await this.articleModel.deleteMany()
  }

}


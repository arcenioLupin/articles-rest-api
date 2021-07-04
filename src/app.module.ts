import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ArticleSchema } from './article/schemas/article.schema';


@Module({
  imports: [ArticleModule,
            MongooseModule.forRoot('mongodb+srv://arcenioLupin:unbueninicio2021@cluster0.engiy.mongodb.net/articles?retryWrites=true&w=majority'),
            ScheduleModule.forRoot(),
            MongooseModule.forFeature([
              {name:'Article', schema : ArticleSchema} 
       ])
           ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

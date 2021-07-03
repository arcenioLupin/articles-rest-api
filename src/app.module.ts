import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';

@Module({
  imports: [ProductModule,MongooseModule.forRoot('mongodb+srv://arcenioLupin:unbueninicio2021@cluster0.engiy.mongodb.net/product-nest-tutorial?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

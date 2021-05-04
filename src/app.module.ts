import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssessmentFormModule } from './assessment-form/assessment-form.module';
import {UserModule} from './user/user.module'

@Module({
  // imports: [ConfigModule.forRoot(), MongooseModule.forRoot(process.env.DB_URL), AssessmentFormModule,UserModule],
  imports: [ConfigModule.forRoot(), MongooseModule.forRoot("mongodb+srv://sriram:Krishh12@cluster0.yxmww.mongodb.net/test"), AssessmentFormModule,UserModule],
  // mongodb+srv://sriram:Krishh12@cluster0.yxmww.mongodb.net/test
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

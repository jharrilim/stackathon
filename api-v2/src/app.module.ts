import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnswerController } from './answer/answer.controller';
import { UserController } from './user/user.controller';
import { QuestionController } from './question/question.controller';

@Module({
    imports: [],
    controllers: [AppController, AnswerController, UserController, QuestionController],
    providers: [AppService],
})
export class AppModule { }

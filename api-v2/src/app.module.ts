import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnswerController } from './answer/answer.controller';
import { UserController } from './user/user.controller';
import { QuestionController } from './question/question.controller';

const OrmModule = TypeOrmModule.forRoot({
    type: 'postgres',
    database: process.env.DB_USER || 'admin',
    username: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'postgres',
    port: +(process.env.DB_PORT || 5432),
    host: process.env.DB_HOST || 'localhost',
    entities: [`${__dirname}/**/*.entity.ts`],
    synchronize: process.env.NODE_ENV !== 'production',
    logger: 'advanced-console',
    logging: 'all',
    dropSchema: process.env.NODE_ENV !== 'production',
    cache: true,
});

@Module({
    imports: [OrmModule],
    controllers: [AppController, AnswerController, UserController, QuestionController],
    providers: [AppService],
})
export class AppModule { }

import { Repository, getRepository } from 'typeorm';
import { Question } from '../../data/entities/question.entity';
import { JsonController, Get, Post, Body, Put, Param, Delete, HttpCode } from 'routing-controllers';
import { QuestionModel } from './question.model';

@JsonController('/questions')
export class QuestionsController {

    constructor(private questionsRepository: Repository<Question>) {
        this.questionsRepository = getRepository(Question);
    }

    @Get()
    getAll() {
        return this.questionsRepository.find();
    }

    @Post()
    @HttpCode(204)
    post(@Body() question: QuestionModel) {
        return this.questionsRepository.insert(question);
    }

    @Put('/:id')
    put(@Param('id') id: number, @Body() question: QuestionModel) {
        return this.questionsRepository.update({ id }, question);
    }

    @Delete('/:id')
    delete(@Param('id') id: number) {
        return this.questionsRepository.delete({ id });
    }
}

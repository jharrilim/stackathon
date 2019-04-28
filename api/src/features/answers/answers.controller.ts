import { Repository, getRepository } from 'typeorm';
import { Answer } from '../../data/entities/answer.entity';
import { JsonController, Get, Post, Body, Put, Param, Delete } from 'routing-controllers';
import { AnswerModel } from './answer.model';
import { User } from '../../data/entities/user.entity';

@JsonController('/answers')
export class AnswersController {

    constructor(
        private readonly answersRepository: Repository<Answer>,
        private readonly usersRepository: Repository<User>
    ) {
        this.answersRepository = getRepository(Answer);
        this.usersRepository = getRepository(User);
    }

    @Get()
    getAll() {
        return this.answersRepository.find();
    }

    @Post()
    async post(@Body() answerModel: AnswerModel) {
        const user = await this.usersRepository.findOne({
            where: {
                id: answerModel.userId
            }
        });
        const answer = this.answersRepository.create({
            user,
            isYes: answerModel.isYes
        });
        return this.answersRepository.save(answer);
    }

    @Put('/:id')
    put(@Param('id') id: number, @Body() answer: AnswerModel) {
        return this.answersRepository.update({ id }, answer);
    }

    @Delete('/:id')
    delete(@Param('id') id: number) {
        return this.answersRepository.delete({ id });
    }
}

import { Repository, getRepository } from 'typeorm';
import { User } from '../../data/entities/user.entity';
import { JsonController, Get, Post, Body, Put, Param, Delete } from 'routing-controllers';
import { UserCreationModel } from './user-creation.model';
import { encryptPassword } from '../../security/encryption';

@JsonController('/users')
export class UsersController {

    constructor(private usersRepository: Repository<User>) {
        this.usersRepository = getRepository(User);
    }

    @Get()
    getAll() {
        return this.usersRepository.find();
    }

    @Post()
    post(@Body() user: UserCreationModel) {
        const { passwordHash, salt } = encryptPassword(user.password);
        const { name } = user;
        this.usersRepository.create({ name, passwordHash, salt });
        return this.usersRepository.save(user);
    }

    @Put('/:id')
    put(@Param('id') id: number, @Body() user: UserCreationModel) {
        return this.usersRepository.update({ id }, user);
    }

    @Delete('/:id')
    delete(@Param('id') id: number) {
        return this.usersRepository.delete({ id });
    }
}

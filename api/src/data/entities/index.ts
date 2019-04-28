import { Answer } from './answer.entity';
import { Question } from './question.entity';
import { User } from './user.entity';

export type Lazy<T> = Promise<T> | T;

export const entities = [
    Answer, Question, User
];

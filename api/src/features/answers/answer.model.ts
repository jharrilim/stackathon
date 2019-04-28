import { Answer } from "../../data/entities/answer.entity";

export interface AnswerModel extends Partial<Answer> {
    userId: number;
    isYes: boolean;
}
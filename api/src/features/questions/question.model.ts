import { Question } from "../../data/entities/question.entity";

export interface QuestionModel extends Partial<Question> {
    text: string;
}

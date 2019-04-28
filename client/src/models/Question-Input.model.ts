import { Question } from "./Question.model";

export interface QuestionInput extends Partial<Question> {
    text: string;
}
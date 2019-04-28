import { getRepository } from "typeorm";
import { Question } from "../entities/question.entity";

const seedData: Partial<Question>[] = [
    { text: 'Are the Leafs ever going to win the Stanley Cup again?' },
    { text: 'Is pineapple an appropriate pizza topping?' },
    { text: 'Is beer an appropriate breakfast drink?' }
];

export async function seedQuestions() {
    const questionRepository = getRepository(Question);
    const questions = questionRepository.create(seedData);
    await questionRepository.save(questions);
    return { questions };
}

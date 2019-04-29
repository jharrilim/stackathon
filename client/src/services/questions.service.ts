import { Question } from "../models/Question.model";
import { AxiosInstance } from "axios";
import { QuestionInput } from "../models/Question-Input.model";
import { IAxiosServiceFactory } from "./axios";

export class QuestionsService {
    private http: AxiosInstance;
    
    constructor(axiosFactory: IAxiosServiceFactory) {
        this.http = axiosFactory.create();
     }

    async getQuestions(): Promise<Question[]> {
        const resource = '/questions';
        try {
            const response = await this.http.get<Question[]>(resource);
            if (response.status !== 200) {
                throw new Error(`Request to ${resource} returned a non 200 status code.`);
            }
            console.log(response);
            return response.data;
        } catch(reason) {
            console.error(reason);
            throw new Error(`Error during call #getQuestions: ${reason}`);
        }
    }

    async createQuestion(questionInput: QuestionInput) {
        try {
            const response = await this.http.post('/questions', questionInput);
            return response.status === 204;
        } catch(reason) {
            console.error(reason);
        }
    }
}
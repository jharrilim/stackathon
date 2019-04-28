import { QuestionsService } from './questions.service';
import { createContext } from 'react';
import { AxiosFactory } from './axios';

export interface IAppContext {
    questionsService: QuestionsService
}

export interface IAppContextFactory {
    create(): IAppContext;
}

export class AppContextFactory implements IAppContextFactory {
    create(): IAppContext {
        return {
            questionsService: new QuestionsService(new AxiosFactory())
        };
    }
}

export const AppContext = createContext(new AppContextFactory().create());

import React, { useContext } from 'react';
import { render, act, cleanup, fireEvent } from 'react-testing-library';
import { QuestionForm } from './QuestionForm';
import { AppContext, AppContextFactory, IAppContext } from '../../services/app.context';
import mockAxios from 'axios';
import { QuestionsService } from '../../services/questions.service';

describe('QuestionForm', () => {
  afterEach(() => {
    cleanup();
  });
  it('should render', () => {
    render(<QuestionForm />);
  });

  it('should trigger questionsService#createQuestion when form submitted', async () => {
    const ctxFactory = new AppContextFactory();
    ctxFactory.create = jest.fn(() => {
      const ctx: IAppContext = {
        questionsService: {
          http: mockAxios.create(),
          getQuestions: jest.fn(() => Promise.resolve([])),
          createQuestion: jest.fn(() => Promise.resolve(true))
        } as any as QuestionsService
      };
      return ctx;
    });
    const MockContext = ctxFactory.create();
    const spy = jest.spyOn(MockContext.questionsService, 'createQuestion');
    spy.mockReturnValueOnce(Promise.resolve(true));

    const qForm = render(
      <AppContext.Provider value={MockContext}>
        <QuestionForm />
      </AppContext.Provider>
    );
    const qInput = qForm.getByPlaceholderText('Enter your question...');
    fireEvent.touchCancel(qInput, {
      target: {
        value: 'blah'
      }
    });
    const btn = qForm.getByText('Create');
    fireEvent.click(btn);

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
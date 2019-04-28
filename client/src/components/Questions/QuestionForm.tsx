import React, { useState, useContext } from 'react';
import { AppContext } from '../../services/app.context';

const QuestionForm = () => {
  const [question, setQuestion] = useState('');
  const { questionsService } = useContext(AppContext);

  const submitForm = (event: any) => {
    event.preventDefault()
    questionsService.createQuestion({ text: question });
  };

  return (
    <form aria-label="Question Form" onSubmit={event => submitForm(event)} className='question-form'>
      <h3>Create a Question</h3>
      <label htmlFor="questionInput">Enter A Question Here</label>
      <input
        id="questionInput"
        name="questionInput"
        aria-label="Question Input"
        aria-required="true"
        className='form-control'
        onChange={({ target }) => setQuestion(target.value)}
        placeholder='Enter your question...'
        value={question}
      />
      <button
        id="questionFormSubmitButton"
        name="questionFormSubmitButton"
        aria-label="Submit Question Button"
        className='btn btn-primary'
        disabled={question === ''}
        type='submit'
      >
        Create
      </button>
    </form>
  )
}

export { QuestionForm };

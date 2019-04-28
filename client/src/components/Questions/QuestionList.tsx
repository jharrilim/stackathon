import React, { useContext, useState, useEffect } from 'react';
import { Question } from '../../models/Question.model';
import { AppContext } from '../../services/app.context';

interface QuestionListPropTypes {
  questions: Array<Question>;
}

const QuestionListBase = ({ questions }: QuestionListPropTypes) => {
  const cards = questions ?
    <>{questions.map(question => (
      <div className='card' key={question.id}>
        <div className='card-body'>
          <h5 className='card-title'>{question.text}</h5>
          <div className='card-body'>
            <button className='btn btn-success' style={{ marginRight: 10 }}>Yes</button>
            <button className='btn btn-danger'>No</button>
          </div>
        </div>
      </div>
    ))}</>
    : <h4>There are currently no questions.</h4>;
  return (
    <div className='question-list'>
      <h3>Recently Added</h3>
      {cards}
    </div>
  );
};

const QuestionList = () => {
  const { questionsService } = useContext(AppContext);
  const [questions, setQuestions] = useState<Array<Question>>([]);
  useEffect(() => {
    const setData = async () => {
      const data = await questionsService.getQuestions();
      setQuestions(data || []);
    };
    setData().catch(console.error);
  }, [questionsService]);

  return <QuestionListBase questions={questions} />
};

export { QuestionList };

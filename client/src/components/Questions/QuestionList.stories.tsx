import  React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { QuestionList } from './QuestionList';

const stories = storiesOf('Components', module);

stories.add(
  'QuestionList',
  () => <QuestionList />,
  { info: { inline: true } }
);
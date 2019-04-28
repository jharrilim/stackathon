import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { unregister } from './serviceWorker';
import { App } from './App';

unregister();

ReactDOM.render(<App />, document.getElementById('root'));

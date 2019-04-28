import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Questions } from './components/Questions';
import './App.css';
import { AppContext, AppContextFactory } from './services/app.context';

const App = () => (
  <AppContext.Provider value={new AppContextFactory().create()}>
    <div className='app'>
    <BrowserRouter>
      <Switch>
        <Route path='/' component={Questions} />
      </Switch>
    </BrowserRouter>
    </div>
  </AppContext.Provider>
);

export { App };

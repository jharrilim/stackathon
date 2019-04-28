import React from 'react';
import { render, cleanup, act } from 'react-testing-library';
import { App } from './App';

describe('App', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders without crashing', () => {
    act(() => {
      render(<App />);
    });
  });

});

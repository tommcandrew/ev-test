import React from 'react';
import wait from 'waait'
import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import App from './App.jsx'
import { clientsMock } from './queries.mock'

describe('App', () => {
  let mocks;
  beforeEach(() => {
    mocks = [
      clientsMock(),
    ];
  });
  function createComponent(m = mocks) {
    return (
      <MockedProvider mocks={m} addTypename={false}>
        <App />
      </MockedProvider>
    );
  }
  it('renders correctly', () => {
    render(createComponent());
  });
});

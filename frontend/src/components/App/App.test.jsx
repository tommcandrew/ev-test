import React from 'react';
import wait from 'waait';
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
  function createComponent() {
    return (
      <MockedProvider mocks={mocks}>
        <App />
      </MockedProvider>
    );
  }
  it('renders correctly', () => {
    render(createComponent());
  });
  it('displays list of clients and their data', async () => {
    const { findByText } = render(createComponent());
    const client1Name = await findByText('Bob')
    expect(client1Name).toBeTruthy()
  });
});

import React from "react";
import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";
import App from ".";
import { clientsMock } from "../../graphql/mockQueries/clients";

describe("App", () => {
  let mocks;
  beforeEach(() => {
    mocks = [clientsMock()];
  });
  function createComponent() {
    return (
      <MockedProvider mocks={mocks}>
        <App />
      </MockedProvider>
    );
  }
  it("should render correctly", () => {
    render(createComponent());
  });
  it("should render Header", async () => {
    const { getByText } = render(createComponent());
    const headerTitle = getByText("Client List");
    expect(headerTitle).toBeDefined();
  });
  it("should render New button", async () => {
    const { getByText } = render(createComponent());
    const headerTitle = getByText("New");
    expect(headerTitle).toBeDefined();
  });
  it("should display client list with mock data", async () => {
    const { findByText } = render(createComponent());
    const client1Name = await findByText("Bob");
    expect(client1Name).toBeTruthy();
  });
});

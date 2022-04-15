import React from "react";
import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";
import ClientList from ".";
import { clientsMock } from "../../graphql/mockQueries/clients";

describe("ClientList", () => {
  let mocks;
  beforeEach(() => {
    mocks = [clientsMock()];
  });
  function createComponent() {
    return (
      <MockedProvider mocks={mocks}>
        <ClientList />
      </MockedProvider>
    );
  }
  it("should render without error", () => {
    render(createComponent());
  });
  it("should render search component", async () => {
    const { getByText } = render(createComponent());
    const searchLabel = getByText("Search:");
    expect(searchLabel).toBeDefined();
  });
  it("should render table headings", async () => {
    const { getByText } = render(createComponent());
    const nameHeading = getByText("Name");
    const emailHeading = getByText("Email");
    const companyHeading = getByText("Company");
    const createdHeading = getByText("Created");
    expect(nameHeading).toBeDefined();
    expect(emailHeading).toBeDefined();
    expect(companyHeading).toBeDefined();
    expect(createdHeading).toBeDefined();
  });
  it("should render list of clients, displaying name, email and company", async () => {
    const { findByText } = render(createComponent());
    const client1Name = await findByText("Bob");
    const client1Email = await findByText("bob@gmail.com");
    const client1Company = await findByText("Google");
    expect(client1Name).toBeTruthy();
    expect(client1Email).toBeTruthy();
    expect(client1Company).toBeTruthy();
  });
  it("should format client createdAt date and display in table", async () => {
    const { findByText } = render(createComponent());
    const client1CreatedAt = await findByText("12/04/2022");
    expect(client1CreatedAt).toBeTruthy();
  });
});

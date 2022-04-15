import React from "react";
import wait from "waait";
import { toast } from "react-toastify";
import { MockedProvider } from "@apollo/client/testing";
import { render, fireEvent, act } from "@testing-library/react";
import CreateClient from ".";
import { createClientMock } from "../../graphql/mockMutations/createClient.js";

describe("CreateClient", () => {
  let mocks;
  let toastSpy
  beforeEach(() => {
    toastSpy = jest.spyOn(toast, "success");
    mocks = [createClientMock()];
  });
  afterEach(() => {
    toastSpy.mockRestore();
  })
  function createComponent() {
    return (
      <MockedProvider mocks={mocks}>
        <CreateClient />
      </MockedProvider>
    );
  }
  it("should render without error", () => {
    render(createComponent());
  });
  it("should render New button", () => {
    const { getByText } = render(createComponent());
    const newClientButton = getByText("New");
    expect(newClientButton).toBeDefined();
  });
  it("should show modal when New button clicked", () => {
    const { getByText } = render(createComponent());
    const newClientButton = getByText("New");
    act(() => {
      fireEvent.click(newClientButton);
    });
    const modalTitle = getByText("New Client");
    expect(modalTitle).toBeDefined();
  });
  it("should close modal when close button clicked", () => {
    const { getByText, queryByText } = render(createComponent());
    const newClientButton = getByText("New");
    act(() => {
      fireEvent.click(newClientButton);
    });
    const closeButton = getByText("×");
    act(() => {
      fireEvent.click(closeButton);
    });
    const modalTitle = queryByText("New Client");
    expect(modalTitle).toBeNull();
  });
  it("should show success toast when client created", async () => {
    const { getByText, getByLabelText } = render(createComponent());
    const newClientButton = getByText("New");
    act(() => {
      fireEvent.click(newClientButton);
    });
    const nameInput = getByLabelText("Name");
    const emailInput = getByLabelText("Email");
    const companyInput = getByLabelText("Company");
    act(() => {
      fireEvent.change(nameInput, { target: { value: "client1" } });
      fireEvent.change(emailInput, { target: { value: "client1@gmail.com" } });
      fireEvent.change(companyInput, { target: { value: "company1" } });
    });
    const saveUserButton = getByText("Save");
    act(() => {
      fireEvent.click(saveUserButton);
    });
    await wait(30);
    expect(toastSpy).toHaveBeenCalledWith(
      "Client created"
    );
  });
});

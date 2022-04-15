import React from "react";
import { render, act, fireEvent } from "@testing-library/react";
import NewClientForm from ".";

describe("NewClientForm", () => {
  let props;
  beforeEach(() => {
    props = {
      handleSaveClient: jest.fn(),
    };
  });
  function createComponent() {
    return <NewClientForm {...props} />;
  }
  it("should render without error", () => {
    render(createComponent());
  });
  it("should render inputs", async () => {
    const { getByLabelText } = render(createComponent());
    const nameInput = getByLabelText("Name");
    const emailInput = getByLabelText("Email");
    const companyInput = getByLabelText("Company");
    expect(nameInput).toBeDefined();
    expect(emailInput).toBeDefined();
    expect(companyInput).toBeDefined();
  });
  it("should update the name value on change", async () => {
    const { getByLabelText } = render(createComponent());
    const nameInput = getByLabelText("Name");
    act(() => {
      fireEvent.change(nameInput, { target: { value: "Bob" } });
    });
    expect(nameInput.value).toEqual("Bob");
  });
  it("should update the email value on change", async () => {
    const { getByLabelText } = render(createComponent());
    const emailInput = getByLabelText("Email");
    act(() => {
      fireEvent.change(emailInput, { target: { value: "bob@gmail.com" } });
    });
    expect(emailInput.value).toEqual("bob@gmail.com");
  });
  it("should update the company value on change", async () => {
    const { getByLabelText } = render(createComponent());
    const companyInput = getByLabelText("Company");
    act(() => {
      fireEvent.change(companyInput, { target: { value: "Google" } });
    });
    expect(companyInput.value).toEqual("Google");
  });
  it("should render a disabled Save button when inputs are empty", () => {
    const { getByText } = render(createComponent());
    const button = getByText("Save");
    expect(button).toBeDisabled();
  });
  it("should render an active Save button when all inputs are not empty", () => {
    const { getByText, getByLabelText } = render(createComponent());
    const nameInput = getByLabelText("Name");
    const emailInput = getByLabelText("Email");
    const companyInput = getByLabelText("Company");
    act(() => {
      fireEvent.change(nameInput, { target: { value: "Bob" } });
      fireEvent.change(emailInput, { target: { value: "bob@gmail.com" } });
      fireEvent.change(companyInput, { target: { value: "Google" } });
    });
    const button = getByText("Save");
    expect(button).not.toBeDisabled();
  });
  it("should call handleSaveClient prop when Save button is clicked", () => {
    const { getByText, getByLabelText } = render(createComponent());
    const nameInput = getByLabelText("Name");
    const emailInput = getByLabelText("Email");
    const companyInput = getByLabelText("Company");
    act(() => {
      fireEvent.change(nameInput, { target: { value: "Bob" } });
      fireEvent.change(emailInput, { target: { value: "bob@gmail.com" } });
      fireEvent.change(companyInput, { target: { value: "Google" } });
    });
    const button = getByText("Save");
    act(() => {
      fireEvent.click(button);
    });
    expect(props.handleSaveClient).toHaveBeenCalled();
  });
});

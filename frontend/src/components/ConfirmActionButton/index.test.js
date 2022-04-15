import React from "react";
import { fireEvent, render, act } from "@testing-library/react";
import ConfirmActionButton from ".";

describe("<ConfirmActionButton />", () => {
  let props;
  beforeEach(() => {
    props = {
      onConfirm: jest.fn(),
      modalTitle: "Delete client",
      modalText: "Are you sure you want to delete this client?",
      modalButtonText: "Confirm",
      children: "Delete",
    };
  });
  function createComponent(p = props) {
    return <ConfirmActionButton {...p} />;
  }
  it("should render without errors", () => {
    render(createComponent());
  });
  it("should render button", () => {
    const { getByText } = render(createComponent());
    const button = getByText("Delete");
    expect(button).toBeDefined();
  });
  it("should show modal on button click", () => {
    const { getByText } = render(createComponent());
    const button = getByText("Delete");
    act(() => {
      fireEvent.click(button);
    });
    const modalTitle = getByText("Delete client");
    expect(modalTitle).toBeDefined();
  });
  it("should call onConfirm prop when confirm button clicked in modal and close modal", () => {
    const { getByText, queryByText } = render(createComponent());
    const button = getByText("Delete");
    act(() => {
      fireEvent.click(button);
    });
    const confirmButton = getByText("Confirm");
    act(() => {
      fireEvent.click(confirmButton);
    });
    expect(props.onConfirm).toHaveBeenCalled()
    const modalTitle = queryByText("Delete client");
    expect(modalTitle).toBeNull();
  });
});

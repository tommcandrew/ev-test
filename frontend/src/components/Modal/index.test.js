import React from "react";
import { render } from "@testing-library/react";
import Modal from ".";

describe("<Modal />", () => {
  const props = {
    isOpen: false,
    closeModal: jest.fn(),
    title: "title",
  };
  function createComponent() {
    return <Modal {...props} />;
  }
  it("should render without error", () => {
    render(createComponent());
  });
  it("should not show modal when isOpen is false", async () => {
    const { queryByText } = render(createComponent());
    expect(queryByText(props.title)).toBeNull();
  });
  it("should show the modal when isOpen is true", async () => {
    props.isOpen = true;
    const { getByText } = render(createComponent());
    expect(getByText(props.title)).toBeDefined();
  });
});

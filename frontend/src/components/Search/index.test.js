import React from "react";
import { render, act, fireEvent } from "@testing-library/react";
import Search from ".";

describe("Search", () => {
  let props;
  beforeEach(() => {
    props = {
      onChange: jest.fn(),
    };
  });
  function createComponent() {
    return <Search {...props} />;
  }
  it("should render without error", () => {
    render(createComponent());
  });
  it("should render search input", async () => {
    const { getByLabelText } = render(createComponent());
    const searchInput = getByLabelText("Search:");
    expect(searchInput).toBeDefined();
  });
  it("should call onChange prop when input value changes", () => {
    const { getByLabelText } = render(createComponent());
    const searchInput = getByLabelText("Search:");
    act(() => {
      fireEvent.change(searchInput, { target: { value: "a" } });
    });
    expect(props.onChange).toHaveBeenCalled();
  });
});

import React from "react";
import { render } from "@testing-library/react";
import Header from ".";

describe("Header", () => {
  function createComponent() {
    return <Header />;
  }
  it("should render correctly", () => {
    render(createComponent());
  });
  it("should render title text", async () => {
    const { getByText } = render(createComponent());
    const headerTitle = getByText("Client List");
    expect(headerTitle).toBeDefined();
  });
});

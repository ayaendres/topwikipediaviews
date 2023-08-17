import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./components/SearchPage", () => ({
  SearchPage: () => <div>Top Wikipedia Views</div>,
}));
test("renders Search Page", () => {
  render(<App />);
  const title = screen.getByText(/Top Wikipedia Views/i);
  expect(title).toBeInTheDocument();
});

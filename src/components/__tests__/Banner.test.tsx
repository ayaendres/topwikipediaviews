import { render, screen } from "@testing-library/react";
import React from "react";
import { Banner } from "../Banner";

test("renders the banner", () => {
  render(<Banner />);
  const banner = screen.getByTestId(/banner/i);
  expect(banner).toBeInTheDocument();
});

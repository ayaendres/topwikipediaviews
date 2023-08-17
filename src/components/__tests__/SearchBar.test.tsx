import { fireEvent, render, screen } from "@testing-library/react";
import { DatePicker } from "../DatePicker";
import React from "react";
import { SearchBar } from "../SearchBar";

describe("SearchBar", () => {
  test("renders SearchBar and its children", () => {
    render(
      <SearchBar
        search={jest.fn()}
        count={100}
        setCount={jest.fn()}
        date={new Date()}
        setDate={jest.fn()}
      />,
    );
    const dateButton = screen.getByText(/DATE/i);
    expect(dateButton).toBeInTheDocument();

    const countButton = screen.getByText(/NUM RESULTS/i);
    expect(countButton).toBeInTheDocument();

    const searchButton = screen.getByText(/search/i);
    expect(searchButton).toBeInTheDocument();
  });
});

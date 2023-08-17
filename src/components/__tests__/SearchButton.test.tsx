import { fireEvent, render, screen } from "@testing-library/react";
import { Pagination } from "../Pagination";
import React from "react";
import { SearchButton } from "../SearchButton";

describe("SearchButton", () => {
  test("renders SearchButton", () => {
    const search = jest.fn();
    render(<SearchButton search={search} />);
    const searchButton = screen.getByText(/Search/i);
    expect(searchButton).toBeInTheDocument();
    fireEvent.click(searchButton);
    expect(search).toBeCalled();
  });
});

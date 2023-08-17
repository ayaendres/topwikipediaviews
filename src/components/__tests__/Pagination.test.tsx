import { fireEvent, getByTestId, render, screen } from "@testing-library/react";
import React from "react";
import { Banner } from "../Banner";
import { Pagination } from "../Pagination";

Element.prototype.scrollIntoView = jest.fn();

describe("Pagination", () => {
  test("renders Pagination", () => {
    render(<Pagination count={100} page={0} setPage={jest.fn()} />);
    const pageOne = screen.getByText(/1/i);
    expect(pageOne).toBeInTheDocument();
    expect(screen.getByTestId("0")).toHaveAttribute("disabled"); // left is disabled
    expect(screen.getByTestId("1")).not.toHaveAttribute("disabled"); // right is enabled
  });

  test("calls to update page to selected page number (-1)", () => {
    const setPage = jest.fn();
    render(<Pagination count={100} page={0} setPage={setPage} />);
    const pageThree = screen.getByText(/3/i);
    fireEvent.click(pageThree);
    expect(setPage).toHaveBeenCalledWith(2);
  });

  test("calls to update page to selected page number (-1)", () => {
    const setPage = jest.fn();
    render(<Pagination count={100} page={0} setPage={setPage} />);
    const pageThree = screen.getByText(/3/i);
    fireEvent.click(pageThree);
    expect(setPage).toHaveBeenCalledWith(2);
  });

  test("calls to update page to +- 1 when arrow button is clicked", () => {
    const setPage = jest.fn();
    const page = 4;
    render(<Pagination count={100} page={page} setPage={setPage} />);
    const right = screen.getByTestId("1");
    fireEvent.click(right);
    expect(setPage).toHaveBeenCalledWith(page + 1);

    const left = screen.getByTestId("0");
    fireEvent.click(left);
    expect(setPage).toHaveBeenCalledWith(page - 1);
  });
});

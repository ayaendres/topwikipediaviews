import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { CountPicker } from "../CountPicker";

describe("CountPicker", () => {
  test("renders CountPicker", () => {
    const setCount = jest.fn();
    render(<CountPicker count={100} setCount={setCount} />);
    const countButton = screen.getByText(/NUM RESULTS/i);
    expect(countButton).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    fireEvent.click(countButton);
    const fifty = screen.getByText("50");
    expect(fifty).toBeInTheDocument();
    fireEvent.click(fifty);
    expect(setCount).toBeCalledWith(50);
  });

  test("handleClickOutside closes the picker", () => {
    render(<CountPicker count={100} setCount={jest.fn()} />);
    const countButton = screen.getByText(/NUM RESULTS/i);
    fireEvent.click(countButton);
    expect(screen.queryByText("50")).toBeInTheDocument(); // picker is open
    fireEvent.click(countButton); // click outside picker
    expect(screen.queryByText("50")).not.toBeInTheDocument(); // picker is closed
  });
});

import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { DatePicker } from "../DatePicker";

const mockDate = new Date(2023, 5, 15);
const mockJuneThree = new Date(2023, 5, 3);
describe("DatePicker", () => {
  test("renders DatePicker", () => {
    const setDate = jest.fn();
    render(<DatePicker date={mockDate} setDate={setDate} />);
    const dateButton = screen.getByText(/DATE/i);
    expect(dateButton).toBeInTheDocument();
    expect(screen.getByText("June 15, 2023")).toBeInTheDocument();
    fireEvent.click(dateButton);
    const juneThree = screen.getByText("3");
    expect(juneThree).toBeInTheDocument();
    fireEvent.click(juneThree);
    expect(setDate).toBeCalledWith(mockJuneThree);
  });

  test("handleClickOutside closes the picker", () => {
    render(<DatePicker date={mockDate} setDate={jest.fn()} />);
    const dateButton = screen.getByText(/DATE/i);
    fireEvent.click(dateButton);
    expect(screen.queryByText("23")).toBeInTheDocument(); // picker is open, can find june 23
    fireEvent.click(dateButton); // click outside picker (on the button again)
    expect(screen.queryByText("23")).not.toBeInTheDocument(); // picker is closed, cant find june 23
  });

  test("the month navigation buttons update the month in view", () => {
    render(<DatePicker date={mockDate} setDate={jest.fn()} />);
    const dateButton = screen.getByText(/DATE/i);
    fireEvent.click(dateButton);
    expect(screen.queryByText(/July 2023/i)).not.toBeInTheDocument(); // picker is in june
    fireEvent.click(screen.getByTestId("monthRight")); // month moves to july
    expect(screen.getByText(/July 2023/i)).toBeInTheDocument(); // picker is in july
    fireEvent.click(screen.getByTestId("monthLeft"));
    fireEvent.click(screen.getByTestId("monthLeft"));
    expect(screen.getByText(/May 2023/i)).toBeInTheDocument(); // 2 months before july
  });
});

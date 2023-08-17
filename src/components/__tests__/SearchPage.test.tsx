import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { SearchPage } from "../SearchPage";
import * as useGetTopArticles from "../../hooks/useGetTopArticles";
import { UseMutationResult } from "react-query";
import { QueryData } from "../../hooks/useGetTopArticles";

Element.prototype.scrollIntoView = jest.fn();
const mockArticles = [{ article: "Barbie", rank: 1, views: 200 }];
const mockData = [{ articles: mockArticles }];

describe("SearchPage", () => {
  test("renders SearchPage and its children", () => {
    const mutate = jest.fn();
    jest
      .spyOn(useGetTopArticles, "useGetTopArticles")
      .mockImplementation(
        (date: Date) =>
          ({ data: mockData, mutate }) as unknown as UseMutationResult<
            QueryData[],
            unknown,
            void,
            unknown
          >,
      );
    render(<SearchPage />);
    const dateButton = screen.getByText(/DATE/i);
    expect(dateButton).toBeInTheDocument();

    const countButton = screen.getByText(/NUM RESULTS/i);
    expect(countButton).toBeInTheDocument();

    const searchButton = screen.getByText(/search/i);
    expect(searchButton).toBeInTheDocument();

    expect(screen.getByText(/barbie/i)).toBeInTheDocument();

    fireEvent.click(searchButton);
    expect(mutate).toBeCalledTimes(2); // initial load + re-search
  });

  test("renders an error when there is no data for the date", () => {
    const mutate = jest.fn();
    jest
      .spyOn(useGetTopArticles, "useGetTopArticles")
      .mockImplementation(
        (date: Date) =>
          ({ error: { code: 400 }, mutate }) as unknown as UseMutationResult<
            QueryData[],
            unknown,
            void,
            unknown
          >,
      );
    render(<SearchPage />);
    const dateButton = screen.getByText("DATE");
    expect(dateButton).toBeInTheDocument();

    const countButton = screen.getByText(/NUM RESULTS/i);
    expect(countButton).toBeInTheDocument();

    const searchButton = screen.getByText(/search/i);
    expect(searchButton).toBeInTheDocument();

    expect(
      screen.getByText(/We were unable to retrieve data for the given date/i),
    ).toBeInTheDocument();
  });
});

import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { ArticleRow } from "../ArticleRow";

describe("ArticleRow", () => {
  test("renders ArticleRow", () => {
    const setPinnedArticles = jest.fn();
    render(
      <ArticleRow
        article="Barbie"
        pinnedArticles={[]}
        setPinnedArticles={setPinnedArticles}
        views={3}
        rank={1}
      />,
    );
    const article = screen.getByText(/barbie/i);
    expect(article).toBeInTheDocument();
    expect(screen.getByText(/3 views/i)).toBeInTheDocument();
    expect(screen.getByText(1)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("pin")); // pin an article
    expect(setPinnedArticles).toHaveBeenCalledWith(["Barbie"]);
  });

  test("unpins an article", () => {
    const setPinnedArticles = jest.fn();
    render(
      <ArticleRow
        article="Barbie"
        pinnedArticles={["Barbie"]}
        setPinnedArticles={setPinnedArticles}
        views={3}
        rank={1}
      />,
    );
    const article = screen.getByText(/barbie/i);
    expect(article).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("pin")); // pin an article
    expect(setPinnedArticles).toHaveBeenCalledWith([]);
  });

  test("renders article row without view data", () => {
    render(
      <ArticleRow
        article="Barbie"
        pinnedArticles={[]}
        setPinnedArticles={jest.fn()}
        rank={1}
      />,
    );

    expect(screen.getByText(/views data not found/i)).toBeInTheDocument();
  });
});

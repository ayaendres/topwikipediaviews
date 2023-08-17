import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { PinnedArticleRow } from "../PinnedArticleRow";

const mockData = [
  {
    article: "Tomorrow",
    rank: 20000,
  },
];

const mockMutate = jest.fn();
jest.mock("../../../hooks/useGetArticle", () => ({
  useGetArticle: () => ({ mutate: mockMutate, data: mockData }),
}));
describe("PinnedArticleRow", () => {
  test("renders PinnedArticleRow", () => {
    const setPinnedArticles = jest.fn();
    render(
      <PinnedArticleRow
        date={new Date()}
        article="Tomorrow"
        pinnedArticles={[]}
        setPinnedArticles={setPinnedArticles}
      />,
    );
    const article = screen.getByText(/tomorrow/i);
    expect(screen.getByText(/views data not found/i)).toBeInTheDocument();
    expect(screen.queryByText(20000)).not.toBeInTheDocument(); // pinned articles don't show rank

    fireEvent.click(screen.getByTestId("pin")); // pin an article
    expect(setPinnedArticles).toHaveBeenCalledWith(["Tomorrow"]);
  });
});

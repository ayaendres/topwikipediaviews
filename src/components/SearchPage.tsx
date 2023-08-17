/** @jsxImportSource @emotion/react */
import { useGetTopArticles } from "../hooks/useGetTopArticles";
import { cssWithMq } from "../styles/cssWithMq";
import { Neutral } from "../styles/brandColors";
import { useEffect, useMemo, useState } from "react";
import { ArticleRow } from "./reusable/ArticleRow";
import { SearchBar } from "./SearchBar";
import { Pagination } from "./Pagination";
import { filterArticles } from "./helpers/filterArticles";
import { PinnedArticleRow } from "./reusable/PinnedArticleRow";

export const PINNED = "pinned";

const contentCss = cssWithMq({
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  justifyContent: "center",
  flexShrink: 0,
  width: "100%",
  maxWidth: ["", "50rem"],
});

const titleCss = cssWithMq({
  color: Neutral[900],
  fontSize: ["1.75rem", "2.5rem"],
  lineHeight: "150%",
  marginTop: ["2rem", "3.5rem"],
  marginBottom: ["1.5rem", "2.5rem"],
  textAlign: "center",
});

const cardCss = cssWithMq({
  display: "flex",
  padding: "2em",
  backgroundColor: Neutral["0"],
  flexDirection: "column",
  alignItems: "center",
  gap: "1.25rem",
  boxShadow: `0px 2px 0px 0px ${Neutral[900]}0F`,
  borderRadius: "1rem",
  marginBottom: "1.5rem",
});

export const PER_PAGE = 10;
export const SearchPage = () => {
  const yesterday = useMemo(() => {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    return today;
  }, []);
  const [pinnedArticles, setPinnedArticles] = useState(
    JSON.parse(sessionStorage.getItem(PINNED) ?? "[]"),
  );
  const [count, setCount] = useState(100);
  const [page, setPage] = useState(0);
  const [date, setDate] = useState(new Date(yesterday));
  const [pinnedDate, setPinnedDate] = useState(new Date(yesterday)); // used to update date on search for pinned articles to delay re-fetches
  const { mutate, data: results } = useGetTopArticles(date);

  useEffect(() => mutate(), [mutate]);

  const search = () => {
    setPage(0);
    setPinnedDate(date);
    mutate();
  };

  const pageRankOffset = useMemo(() => page * PER_PAGE, [page]);

  const displayData =
    (results &&
      filterArticles(results[0].articles, count).slice(
        pageRankOffset,
        pageRankOffset + PER_PAGE,
      )) ||
    [];
  return (
    <div css={contentCss}>
      <div css={titleCss}>Top Wikipedia articles</div>
      <SearchBar
        date={date}
        setDate={setDate}
        count={count}
        setCount={setCount}
        search={search}
      />
      {pinnedArticles.length > 0 && page === 0 && (
        <div css={cardCss}>
          {pinnedArticles.map((row: string) => (
            <PinnedArticleRow
              article={row}
              pinnedArticles={pinnedArticles}
              setPinnedArticles={setPinnedArticles}
              key={row}
              date={pinnedDate}
            />
          ))}
        </div>
      )}
      <div css={cardCss}>
        {displayData.map((row, index) => (
          <ArticleRow
            key={row.rank}
            article={row.article}
            views={row.views}
            rank={pageRankOffset + index + 1}
            pinnedArticles={pinnedArticles}
            setPinnedArticles={setPinnedArticles}
          />
        ))}
      </div>
      <Pagination page={page} setPage={setPage} count={count} />
    </div>
  );
};

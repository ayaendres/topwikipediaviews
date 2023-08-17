import { ArticleRow } from "./ArticleRow";
import { Dispatch, useEffect } from "react";
import { useGetArticle } from "../../hooks/useGetArticle";

interface PinnedArticleRowProps {
  article: string;
  pinnedArticles: Array<string>;
  setPinnedArticles: Dispatch<Array<string>>;
  date: Date;
}
export const PinnedArticleRow = (props: PinnedArticleRowProps) => {
  const { article, pinnedArticles, setPinnedArticles, date } = props;
  const { mutate, data } = useGetArticle(article);

  useEffect(() => mutate(date), [date, mutate]);

  return (
    <ArticleRow
      pinnedArticles={pinnedArticles}
      setPinnedArticles={setPinnedArticles}
      article={article}
      views={data && data[0].views}
    />
  );
};

import { Article } from "../../hooks/useGetTopArticles";

const filterList: Array<string> = ["Main_Page", "Wikipedia:Featured_pictures"];

const filterSpecial = (article: string) => article.startsWith("Special:");
export const filterArticles = (
  articles: Array<Article>,
  count: number,
): Array<Article> => {
  return articles
    .filter(
      (article) =>
        !filterList.includes(article.article) &&
        !filterSpecial(article.article),
    )
    .slice(0, count);
};

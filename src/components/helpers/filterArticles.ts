import { Article } from "../../hooks/useGetTopArticles";

const filterList: Array<string> = [
  "Main_Page",
  "Special:Search",
  "Wikipedia:Featured_pictures",
];

export const filterArticles = (
  articles: Array<Article>,
  count: number,
): Array<Article> => {
  return articles
    .filter((article) => !filterList.includes(article.article))
    .slice(0, count);
};

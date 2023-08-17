import { useMutation } from "react-query";
import axios, { AxiosResponse } from "axios";
import { padDate } from "../components/helpers/padDate";

const pageViewsURL =
  "https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access";

export interface Article {
  article: string;
  views: number;
  rank: number;
}

interface QueryData {
  project: string;
  access: string;
  year: string;
  month: string;
  day: string;
  articles: Array<Article>;
}
interface ViewsResponse {
  items: Array<QueryData>;
}

/**
 * getTopArticles calls the wikimedia API for an array of the top articles for a given day
 * @param date
 * Date gets parsed into day month and year which are used in the API url.
 *
 * The API response arrives with metadata, and a list of articles (see Article type).
 * Data from articles is used to populate the results.
 */
const getTopArticles = async (date: Date) => {
  const day = date.getDate();
  const month = (date.getMonth() + 1) % 12; // JS Date is 0-indexed
  const year = date.getFullYear();
  try {
    const response: AxiosResponse<ViewsResponse> = await axios.get(
      `${pageViewsURL}/${year}/${padDate(month)}/${padDate(day)}`,
    );
    return response.data.items;
  } catch (error) {
    return [];
  }
};
export const useGetTopArticles = (date: Date) => {
  return useMutation([date.toDateString()], () => getTopArticles(date));
};

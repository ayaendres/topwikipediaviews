import { useMutation } from "react-query";
import axios, { AxiosResponse } from "axios";
import { padDate } from "../components/helpers/padDate";

const articleViewsUrl =
  "https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/all-agents";

interface QueryData {
  article: string;
  views?: number;
}
interface ViewsResponse {
  items: Array<QueryData>;
}

/**
 * getArticle gets the Article data (view, article, rank) for a given day
 * @param date - used to tell the API the date range we want to search. Just 1 day in this case.
 * @param article - used to tell the API what article to get Article data for
 *
 * returns QueryData:
 *  - in the case of the API finding data, we return views.
 *  - if the API fails to find data, we throw the error, which can be handled by the components (showing an error)
 */
const getArticle = async (date: Date, article: string) => {
  const day = date.getDate();
  const month = date.getMonth() + 1; // JS Date is 0-indexed
  const year = date.getFullYear();
  const formattedDate = `${year}${padDate(month)}${padDate(day)}`;
  try {
    const response: AxiosResponse<ViewsResponse> = await axios.get(
      `${articleViewsUrl}/${article}/daily/${formattedDate}/${formattedDate}`,
    );
    return response.data.items;
  } catch (error) {
    throw error;
  }
};
export const useGetArticle = (article: string) => {
  return useMutation([article], (date: Date) => getArticle(date, article));
};

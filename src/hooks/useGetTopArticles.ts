import {useQuery} from "react-query";
import axios from "axios";

const pageViewsURL = 'https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access';

const padDate = (date: number) => date.toString().padStart(2, '0');
const getTopArticles = async (day: number, month: number, year: number) => {
    try {
        return await axios.get(`${pageViewsURL}/${year}/${padDate(month)}/${padDate(day)}`)
    } catch (error) {

    }
}
export const useGetTopArticles = (day: number, month: number, year: number) => {
    return useQuery([day, month, year], () => getTopArticles(day, month, year));
};
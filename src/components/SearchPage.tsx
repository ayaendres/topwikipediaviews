import {useGetTopArticles} from "../hooks/useGetTopArticles";


export const SearchPage = () => {
    const data = useGetTopArticles(9, 8, 2023);

    return (<p>
        {JSON.stringify(data.data?.data)}
    </p>)
}
import { renderHook, waitFor } from "@testing-library/react";
import { useGetArticle } from "../useGetArticle";
import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import axios from "axios";
import { useGetTopArticles } from "../useGetTopArticles";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const testAxiosResponse = {
  data: {
    items: [
      {
        project: "wikipedia.org",
        articles: [{ article: "Barbie", views: 333, rank: 1 }],
      },
    ],
  },
};

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
describe("useGetTopArticles", () => {
  it("should get articles data for a day", async () => {
    const { result } = renderHook(() => useGetTopArticles(new Date()), {
      wrapper: wrapper,
    });
    mockedAxios.get.mockResolvedValue(testAxiosResponse);

    result.current.mutate();

    // Waiting for the request status to resolve as success
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // Make sure the request status resolved to true
    expect(result.current.data).toBe(testAxiosResponse.data.items);
  });

  it("should throw when top articles data is not found", async () => {
    const { result } = renderHook(() => useGetTopArticles(new Date()), {
      wrapper: wrapper,
    });
    mockedAxios.get.mockRejectedValue({
      error: { code: 404 },
    });

    result.current.mutate();

    // Waiting for the request status to resolve as success
    await waitFor(() => expect(result.current.isError).toBe(true));

    // Make sure the request status resolved to true
    expect(result.current.data).toBe(undefined);
  });
});

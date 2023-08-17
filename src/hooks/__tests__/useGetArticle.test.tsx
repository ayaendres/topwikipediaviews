import { renderHook, waitFor } from "@testing-library/react";
import { useGetArticle } from "../useGetArticle";
import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import axios from "axios";

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

const testArticle = [{ article: "Barbie", views: 333 }];

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
describe("useGetArticle", () => {
  it("should get an existing article", async () => {
    const article = "Barbie";
    const { result } = renderHook(() => useGetArticle(article), {
      wrapper: wrapper,
    });
    mockedAxios.get.mockResolvedValue({
      data: { items: testArticle },
    });

    result.current.mutate(new Date());

    // Waiting for the request status to resolve as success
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // Make sure the request status resolved to true
    expect(result.current.data).toBe(testArticle);
  });

  it("should throw when article data is not found", async () => {
    const article = "Barbie";
    const { result } = renderHook(() => useGetArticle(article), {
      wrapper: wrapper,
    });
    mockedAxios.get.mockRejectedValue({
      error: {},
    });

    result.current.mutate(new Date());

    // Waiting for the request status to resolve as success
    await waitFor(() => expect(result.current.isError).toBe(true));

    // Make sure the request status resolved to true
    expect(result.current.data).toBe(undefined);
  });
});

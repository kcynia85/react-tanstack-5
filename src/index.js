import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const root = ReactDOM.createRoot(document.getElementById("root"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
      retry: 0, // 10 seconds
    },
  },
});

root.render(
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools />
    <App />
  </QueryClientProvider>
);

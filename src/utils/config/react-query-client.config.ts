import { QueryClient, QueryClientConfig } from "react-query";

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: 2,
    },
  },
};

export const queryClient = new QueryClient(queryClientConfig);

"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface ProvidersProps {
  children?: React.ReactNode;
}

const queryClient = new QueryClient();

const Providers: React.FC<ProvidersProps> = (props) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </>
  );
};

export default Providers;

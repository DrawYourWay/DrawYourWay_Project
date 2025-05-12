import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";
import theme from "./theme/theme";

interface ProvidersProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

const Providers = ({ children }: ProvidersProps) => (
  <>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={theme}>
        <BrowserRouter>{children}</BrowserRouter>
      </ChakraProvider>
    </QueryClientProvider>
  </>
);

export default Providers;

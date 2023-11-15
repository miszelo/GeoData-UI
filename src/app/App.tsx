import { Header } from "./components/Header.tsx";
import { Footer } from "./components/Footer.tsx";
import { Map } from "./components/Map.tsx";
import { MainContent } from "./styled/MainContent.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC } from "react";

const queryClient = new QueryClient();

export const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MainContent>
        <Header />
        <div>
          <Map />
        </div>
        <Footer />
      </MainContent>
    </QueryClientProvider>
  );
};

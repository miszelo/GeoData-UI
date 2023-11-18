import { Header } from "./components/header/Header.tsx";
import { Footer } from "./components/footer/Footer.tsx";
import { Layout } from "./components/main/MainStyles.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC } from "react";
import { Main } from "./components/main/Main";

const queryClient = new QueryClient();

export const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Header />
        <Main />
        <Footer />
      </Layout>
    </QueryClientProvider>
  );
};

import { Header } from "./components/Header.tsx";
import { Footer } from "./components/Footer.tsx";
import { Map } from "./components/Map.tsx";
import { MainContent } from "./styled/MainContent.ts";

function App() {
  return (
    <MainContent>
      <Header />
      <Map />
      <Footer />
    </MainContent>
  );
}

export default App;

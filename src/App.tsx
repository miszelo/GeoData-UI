import { Header } from "./components/Header.tsx";
import { Footer } from "./components/Footer.tsx";
import { MyMap } from "./components/MyMap.tsx";
import {MainContent} from "./styled/MainContent.ts";

function App() {
  return (
    <MainContent>
      <Header />
      <MyMap />
      <Footer />
    </MainContent>
  );
}

export default App;

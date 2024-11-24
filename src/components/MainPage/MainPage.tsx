import { Footer } from "./footer/Footer";
import { Header } from "./header/Header";
import { Information } from "./Information/Information";
import { News } from "./News/News";

export function MainPage() {
  return (
    <>
      <Header />
      <Information />
      <News />
      <Footer />
    </>
  );
}

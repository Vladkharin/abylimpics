import { useEffect, useState } from "react";
import { Footer } from "./footer/Footer";
import { Header } from "./header/Header";
import { Information } from "./Information/Information";
import { News } from "./News/News";
import { DATA } from "../../App";

export function MainPage() {
  const [data, setData] = useState<DATA>();

  async function f() {
    const response = await fetch("./data/data.json");

    const data = response.json();

    return data;
  }

  async function changeState() {
    const data = await f();

    setData(data);
  }

  useEffect(() => {
    changeState();
  }, []);

  if (!data) {
    return;
  }

  console.log(data);
  return (
    <>
      <Header />
      <Information certificates={data.mainPage.cerificates} />
      <News news={data.mainPage.news} secondMenu={data.mainPage.secondMenu} />
      <Footer />
    </>
  );
}

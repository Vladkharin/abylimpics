import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { MainPage } from "./components/MainPage/MainPage";
import { AdminPanel } from "./components/AdminPanel/AdminPanel";
import { ParagraphPage } from "./components/ParagraphPage/ParagraphPage";

export type MAINPAGE = {
  certificates: string[];
  news: {
    img: string;
    date: string;
    descr: string;
  }[];
  secondMenu: {
    title: string;
    menu: {
      highlighted: string;
      sentence: string;
    }[];
  };
  thirdMenu: {
    title: string;
    menu: {
      highlighted: string;
      sentence: string;
    }[];
  };
  paragraphs: {
    name: string;
    link: string;
  }[];
};

export type PARAGRAPHS = {
  name: string;
  subparagraphs: { title: string; name: string; content: { name: string; link?: string }[] }[];
}[];

export type DATA = {
  mainPage: MAINPAGE;
  paragraphs: PARAGRAPHS;
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<MainPage />} />
        <Route path={"/admin-panel"} element={<AdminPanel />} />
        <Route path={"/:paragraph?"} element={<ParagraphPage />} />
      </Routes>
    </Router>
  );
}

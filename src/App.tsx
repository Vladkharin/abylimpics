import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { MainPage } from "./components/MainPage/MainPage";
import { AdminPanel } from "./components/AdminPanel/AdminPanel";
import { ParagraphPage } from "./components/ParagraphPage/ParagraphPage";

type NEWSMAINPAGE = {
  img: string;
  date: string;
  descr: string;
}[];

type MENUMAINPAGE = {
  title: string;
  menu: {
    highlighted: string;
    sentence: string;
  }[];
};

type PARAGRAPHSMAINPAGE = {
  name: string;
  link: string;
}[];

export type MAINPAGE = {
  [key: string]: string[] | NEWSMAINPAGE | MENUMAINPAGE | PARAGRAPHSMAINPAGE | number;
  certificates: string[];
  news: NEWSMAINPAGE;
  secondMenu: MENUMAINPAGE;
  thirdMenu: MENUMAINPAGE;
  paragraphs: PARAGRAPHSMAINPAGE;
};

export type SUBTITLE = {
  name: string;
  type: "link" | "doc" | "pdf" | "text" | "scroller" | "scroller" | "video";
  link?: string;
  links?: string[];
  highlighted_blue?: string[];
  highlighted_black?: string[];
};

export type TYPEFILE = "doc" | "pdf" | "text" | "link" | "scroller" | "news";
export type NEWS = {
  title: string;
  subtitle?: SUBTITLE[];
  date: string;
};

export type CONTENT = { name: string; link?: string; links?: string[]; type: TYPEFILE; number?: boolean; news?: NEWS };

export type PARAGRAPHS = {
  name: string;
  subparagraphs: {
    title: string;
    name: string;
    content: CONTENT[];
  }[];
}[];

export type TYPECONTENT = {
  title: string;
  name: string;
}[];

export type DATA = {
  mainPage: MAINPAGE;
  paragraphs: PARAGRAPHS;
  typeContent: TYPECONTENT;
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

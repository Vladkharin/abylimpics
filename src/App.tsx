import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { MainPage } from "./components/MainPage/MainPage";
import { AdminPanel } from "./components/AdminPanel/AdminPanel";

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
};

export type DATA = {
  mainPage: MAINPAGE;
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<MainPage />} />
        <Route path={"/admin-panel"} element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

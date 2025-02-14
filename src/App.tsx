import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { MainPage } from "./components/MainPage/MainPage";
import { AdminPanel } from "./components/AdminPanel/AdminPanel";
import { ParagraphPage } from "./components/ParagraphPage/ParagraphPage";
import { useState } from "react";

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
  type: "link" | "doc" | "pdf" | "text" | "scroller" | "scroller" | "video" | "videoMP4";
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
  const [voiceHelperState, setVoiceHelperState] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<MainPage voiceHelperState={voiceHelperState} setVoiceHelperState={setVoiceHelperState} />} />
        <Route path={"/admin-panel"} element={<AdminPanel />} />
        <Route
          path={"/:paragraph?"}
          element={<ParagraphPage voiceHelperState={voiceHelperState} setVoiceHelperState={setVoiceHelperState} />}
        />
      </Routes>
    </Router>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function voiceHelper(
  event:
    | React.MouseEvent<HTMLAnchorElement, MouseEvent>
    | React.MouseEvent<HTMLImageElement, MouseEvent>
    | React.MouseEvent<HTMLButtonElement, MouseEvent>
    | React.MouseEvent<HTMLHeadingElement, MouseEvent>
    | React.MouseEvent<HTMLParagraphElement, MouseEvent>
    | React.MouseEvent<HTMLDivElement, MouseEvent>,
  voiceHelperState: boolean
) {
  if (!voiceHelperState) {
    return;
  }

  const targetPrev = event.target as HTMLElement;
  let text;

  if (targetPrev.localName == "a") {
    const target = event.target as HTMLLinkElement;
    text = target.innerText;
  } else if (targetPrev.localName == "img") {
    const target = event.target as HTMLImageElement;
    text = target.alt;
  } else if (targetPrev.localName == "button") {
    const target = event.target as HTMLButtonElement;
    text = target.innerText;
  } else if (targetPrev.localName == "h1" || targetPrev.localName == "h2" || targetPrev.localName == "h3") {
    const target = event.target as HTMLHeadingElement;
    text = target.innerText;
  } else if (targetPrev.localName == "p") {
    const target = event.target as HTMLParagraphElement;
    text = target.innerText;
  } else if (targetPrev.localName) {
    const target = event.target as HTMLDivElement;
    text = target.innerText;
  }
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
}

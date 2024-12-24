import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { DATA, PARAGRAPHS, voiceHelper } from "../../../App";
import { useState } from "react";

export function Header({
  data,
  setActiveParagraph,
  setActiveTab,
  voiceHelperState,
  setVoiceHelperState,
}: {
  data: DATA;
  setActiveParagraph: React.Dispatch<React.SetStateAction<PARAGRAPHS | undefined>>;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  voiceHelperState: boolean;
  setVoiceHelperState: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [menuState, setMenuState] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div style={{ display: menuState ? "flex" : "none", alignItems: "center", flexDirection: "column", gap: "20px" }}>
          <button
            className={styles.button_voice_helper}
            onMouseEnter={(event) => voiceHelper(event, voiceHelperState)}
            onClick={() => (voiceHelperState ? setVoiceHelperState(false) : setVoiceHelperState(true))}
          >
            {voiceHelperState ? "Выключить озвучку" : "Включить озвучку"}
          </button>
          {/* <div>
            <div style={{ textAlign: "center" }}>Размер текст</div>
            <div>
              <button>Маленький</button>
              <button>Средний</button>
              <button>Большой</button>
            </div>
          </div> */}
        </div>
        <div className={styles.container}>
          <div className={styles.link_for_disabled_person}>
            <button
              onMouseEnter={(event) => voiceHelper(event, voiceHelperState)}
              onClick={() => (menuState ? setMenuState(false) : setMenuState(true))}
              className={styles.text_for_disabled_person}
            >
              <img src="./icons/eye icon.svg" alt="Версия для слабовидящих" />
              Версия для слабовидящих
            </button>
          </div>
        </div>
        <div className={styles.main_information}>
          <div className={styles.container}>
            <div className={styles.main_information_wrapper}>
              <div className={styles.logo}>
                <Link onMouseEnter={(event) => voiceHelper(event, voiceHelperState)} to={"/"}>
                  <img src="./icons/logo.svg" alt="Логотип" />
                </Link>
              </div>
              <Nav data={data} setActiveParagraph={setActiveParagraph} setActiveTab={setActiveTab} voiceHelperState={voiceHelperState} />

              <div className={styles.main_information_inner}></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function Nav({
  data,
  setActiveParagraph,
  setActiveTab,
  voiceHelperState,
}: {
  data: DATA;
  setActiveParagraph: React.Dispatch<React.SetStateAction<PARAGRAPHS | undefined>>;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  voiceHelperState: boolean;
}) {
  return (
    <nav className={styles.nav}>
      {data.mainPage.paragraphs.map((item: { name: string; link: string }, index: number) => (
        <Link
          onMouseEnter={(event) => voiceHelper(event, voiceHelperState)}
          key={index}
          to={`/${item.link}`}
          onClick={() => {
            setActiveParagraph(data.paragraphs.filter((car) => car.name == "/" + item.link));
            setActiveTab(0);
          }}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}

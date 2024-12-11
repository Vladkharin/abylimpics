import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { DATA, PARAGRAPHS } from "../../../App";

export function Header({
  data,
  setActiveParagraph,
  setActiveTab,
}: {
  data: DATA;
  setActiveParagraph: React.Dispatch<React.SetStateAction<PARAGRAPHS | undefined>>;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <a className={styles.link_for_disabled_person} href="">
            <img src="./assets/icons/eye icon.svg" alt="" />
            <p className={styles.text_for_disabled_person}>Версия для слабовидящих</p>
          </a>
        </div>
        <div className={styles.main_information}>
          <div className={styles.container}>
            <div className={styles.main_information_wrapper}>
              <div className={styles.logo}>
                <Link to={"/"}>
                  <img src="./assets/icons/logo.svg" alt="" />
                </Link>
              </div>
              <Nav data={data} setActiveParagraph={setActiveParagraph} setActiveTab={setActiveTab} />

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
}: {
  data: DATA;
  setActiveParagraph: React.Dispatch<React.SetStateAction<PARAGRAPHS | undefined>>;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <nav className={styles.nav}>
      {data.mainPage.paragraphs.map((item: { name: string; link: string }, index: number) => (
        <Link
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

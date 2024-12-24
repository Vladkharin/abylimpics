import React, { useEffect, useState } from "react";
import styles from "./News.module.css";
import { CONTENT, DATA, voiceHelper } from "../../../App";
import { Link } from "react-router-dom";

export function News({ data, voiceHelperState }: { data: DATA; voiceHelperState: boolean }) {
  const [dataNews, setDataNews] = useState<CONTENT[]>([]);
  function createNewsArray() {
    const paragraph = data.paragraphs.filter((item) => item.name == "/News")[0];

    const array: CONTENT[] = [];
    paragraph.subparagraphs.forEach((_item, index) => {
      const sortContent = paragraph.subparagraphs[index].content.sort(compare);

      sortContent.forEach((car) => {
        if (array.length >= 5) {
          return;
        }

        array.push(car);
      });
    });

    return array;
  }

  function compare(a: CONTENT, b: CONTENT): number {
    if (!a.news || !b.news) {
      return 0;
    }

    const arrayDateA = a.news.date.split(".");
    const arrayDateB = b.news.date.split(".");
    const dateA = new Date(Number(arrayDateA[2]), Number(arrayDateA[1]), Number(arrayDateA[0]));
    const dateB = new Date(Number(arrayDateB[2]), Number(arrayDateB[1]), Number(arrayDateB[0]));

    return dateB.getTime() - dateA.getTime();
  }

  useEffect(() => {
    setDataNews(createNewsArray());
  }, []);
  function NewsTiles() {
    return (
      <div className={styles.wrapper}>
        {dataNews.map((item, index) => {
          const subtitle = item.news?.subtitle?.filter((item) => item.type === "scroller");
          let img = "";

          console.log(subtitle);

          if (subtitle?.length != 0 && subtitle) {
            img = subtitle[0].links?.filter((_car, index) => index == 0)[0] as string;
          }
          return (
            <React.Fragment key={index}>
              <div className={styles.tile}>
                <div style={{ flexBasis: img == "" ? "0%" : "50%", display: img == "" ? "none" : "block" }}>
                  <img
                    onMouseEnter={(event) => voiceHelper(event, voiceHelperState)}
                    src={"./docs/" + img}
                    alt={`Фото ${item.news?.title}`}
                  />
                </div>
                <div className={styles.texts}>
                  <div onMouseEnter={(event) => voiceHelper(event, voiceHelperState)} className={styles.date}>
                    {item.news?.date}
                  </div>
                  <p onMouseEnter={(event) => voiceHelper(event, voiceHelperState)} className={styles.descr}>
                    {item.news?.title}
                  </p>
                </div>
              </div>
              <div className={styles.line} style={{ display: index == 4 ? "none" : "block" }} />
            </React.Fragment>
          );
        })}
        <button className={styles.button}>
          <Link
            onMouseEnter={(event) => voiceHelper(event, voiceHelperState)}
            style={{ textDecoration: "none", color: "#0540f2" }}
            to={"News"}
          >
            Все Новости
          </Link>
        </button>
      </div>
    );
  }

  const [firstStateMenu, setFirstStateMenu] = useState(false);
  const [secondStateMenu, setSecondStateMenu] = useState(false);
  return (
    <section className={styles.news}>
      <div className={styles.container}>
        <h3 onMouseEnter={(event) => voiceHelper(event, voiceHelperState)} className={styles.h3}>
          Новости
        </h3>
        <NewsTiles />
        <SecondMenu
          firstStateMenu={firstStateMenu}
          setFirstStateMenu={setFirstStateMenu}
          secondMenu={data.mainPage.secondMenu}
          voiceHelperState={voiceHelperState}
        />
        <ThirdMenu
          secondStateMenu={secondStateMenu}
          setSecondStateMenu={setSecondStateMenu}
          thirdMenu={data.mainPage.thirdMenu}
          voiceHelperState={voiceHelperState}
        />

        <div className={styles.links}>
          <a href="">
            <img onMouseEnter={(event) => voiceHelper(event, voiceHelperState)} src="./icons/pdd.jpg" alt="Партнер" />
          </a>
          <a href="">
            <img onMouseEnter={(event) => voiceHelper(event, voiceHelperState)} src="./icons/mnvorf.svg" alt="Партнер" />
          </a>
          <a href="">
            <img onMouseEnter={(event) => voiceHelper(event, voiceHelperState)} src="./icons/mo.png" alt="Партнер" />
          </a>
          <a href="">
            <img onMouseEnter={(event) => voiceHelper(event, voiceHelperState)} src="./icons/img.jpg" alt="Партнер" />
          </a>
          <a href="">
            <img onMouseEnter={(event) => voiceHelper(event, voiceHelperState)} src="./icons/td.png" alt="Партнер" />
          </a>
          <a href="">
            <img onMouseEnter={(event) => voiceHelper(event, voiceHelperState)} src="./icons/ceil.jpg" alt="Партнер" />
          </a>
          <a href="">
            <img onMouseEnter={(event) => voiceHelper(event, voiceHelperState)} src="./icons/oatk.png" alt="Партнер" />
          </a>
          <div className={styles.social_links}>
            <a href="https://vk.com/abilympics">
              <img onMouseEnter={(event) => voiceHelper(event, voiceHelperState)} src="./icons/vk_blue.svg" alt="вконтакте абилимпикс" />
            </a>
            <a href="https://t.me/abilympics_russia">
              <img onMouseEnter={(event) => voiceHelper(event, voiceHelperState)} src="./icons/tg_blue.svg" alt="телеграм абилимпикс" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function SecondMenu({
  firstStateMenu,
  setFirstStateMenu,
  secondMenu,
  voiceHelperState,
}: {
  firstStateMenu: boolean;
  setFirstStateMenu: React.Dispatch<React.SetStateAction<boolean>>;
  secondMenu: {
    title: string;
    menu: {
      highlighted: string;
      sentence: string;
    }[];
  };
  voiceHelperState: boolean;
}) {
  return (
    <div className={styles.wrapper}>
      <div
        className={styles.main_information}
        style={{
          background: firstStateMenu ? "#e4ebf9" : "#ffffff",
          borderRadius: firstStateMenu ? "20px 20px 0 0" : "20px",
          transition: "all 1s ease-in-out",
        }}
      >
        <p onMouseEnter={(event) => voiceHelper(event, voiceHelperState)} style={{ color: firstStateMenu ? "#0540f2" : "#000000" }}>
          {secondMenu.title}
        </p>

        <button
          onClick={() => (firstStateMenu ? setFirstStateMenu(false) : setFirstStateMenu(true))}
          style={{ rotate: firstStateMenu ? "180deg" : "0deg" }}
        >
          <img
            onMouseEnter={(event) => voiceHelper(event, voiceHelperState)}
            src="./icons/arrow.svg"
            alt={firstStateMenu ? "Закрыть" : "Открыть"}
          />
        </button>
      </div>
      <div
        className={firstStateMenu ? styles.main_information_show : styles.main_information_hide}
        style={{ transition: "all 1s ease-in-out" }}
      >
        <div className={firstStateMenu ? styles.descr_wrapper_show : styles.descr_wrapper_hide}>
          {secondMenu.menu.map((item, index) => {
            return (
              <p
                onMouseEnter={(event) => voiceHelper(event, voiceHelperState)}
                key={index}
                className={styles.descr}
                style={{ height: firstStateMenu ? "auto" : "0", margin: firstStateMenu ? "10px 0 30px 0" : "0" }}
              >
                <span>{item.highlighted}</span> {item.sentence}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ThirdMenu({
  secondStateMenu,
  setSecondStateMenu,
  thirdMenu,
  voiceHelperState,
}: {
  secondStateMenu: boolean;
  setSecondStateMenu: React.Dispatch<React.SetStateAction<boolean>>;
  thirdMenu: {
    title: string;
    menu: {
      highlighted: string;
      sentence: string;
    }[];
  };
  voiceHelperState: boolean;
}) {
  return (
    <div className={styles.wrapper}>
      <div
        className={styles.main_information}
        style={{
          background: secondStateMenu ? "#e4ebf9" : "#ffffff",
          borderRadius: secondStateMenu ? "20px 20px 0 0" : "20px",
          transition: "all 1s ease-in-out",
        }}
      >
        <p onMouseEnter={(event) => voiceHelper(event, voiceHelperState)} style={{ color: secondStateMenu ? "#0540f2" : "#000000" }}>
          {thirdMenu.title}
        </p>

        <button
          onClick={() => (secondStateMenu ? setSecondStateMenu(false) : setSecondStateMenu(true))}
          style={{ rotate: secondStateMenu ? "180deg" : "0deg" }}
        >
          <img
            onMouseEnter={(event) => voiceHelper(event, voiceHelperState)}
            src="./icons/arrow.svg"
            alt={secondStateMenu ? "Закрыть" : "Открыть"}
          />
        </button>
      </div>
      <div
        className={secondStateMenu ? styles.main_information_show : styles.main_information_hide}
        style={{ transition: "all 1s ease-in-out" }}
      >
        <div className={secondStateMenu ? styles.descr_wrapper_show : styles.descr_wrapper_hide}>
          {thirdMenu.menu.map((item, index) => {
            return (
              <p
                onMouseEnter={(event) => voiceHelper(event, voiceHelperState)}
                key={index}
                className={styles.descr}
                style={{ height: secondStateMenu ? "auto" : "0", margin: secondStateMenu ? "10px 0 30px 0" : "0" }}
              >
                <span>{item.highlighted}</span> {item.sentence}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}

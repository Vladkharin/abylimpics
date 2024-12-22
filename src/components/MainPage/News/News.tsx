import React, { useEffect, useState } from "react";
import styles from "./News.module.css";
import { CONTENT, DATA } from "../../../App";

export function News({ data }: { data: DATA }) {
  function createNewsArray() {
    const paragraph = data.paragraphs.filter((item) => item.name == "/News")[0];

    const array: CONTENT[] = [];
    paragraph.subparagraphs.forEach((item, index) => {
      const sortContent = paragraph.subparagraphs[index].content.sort(compare);

      console.log(sortContent);
      // sortContent.forEach((car) => {
      //   array.shift(car);
      // });
    });

    console.log(paragraph);
  }

  function compare(a: CONTENT, b: CONTENT): number {
    if (!a.news || !b.news) {
      return 0;
    }

    const arrayDateA = a.news.date.split(".");
    const arrayDateB = b.news.date.split(".");
    Å;
    const dateA = new Date(Number(arrayDateA[2]), Number(arrayDateA[1]), Number(arrayDateA[0]));
    const dateB = new Date(Number(arrayDateB[2]), Number(arrayDateB[1]), Number(arrayDateB[0]));

    console.log(dateA, dateB);

    return dateB.getSeconds() - dateA.getSeconds();
  }

  useEffect(() => {
    createNewsArray();
  }, []);
  function NewsTiles() {
    return (
      <div className={styles.wrapper}>
        {data.mainPage.news.map((item, index) => {
          if (index >= 5) {
            return;
          }
          return (
            <React.Fragment key={index}>
              <a className={styles.tile} href="">
                <div>
                  <img src={"./assets/docs/" + item.img} alt="news" />
                </div>
                <div className={styles.texts}>
                  <div className={styles.date}>{item.date}</div>
                  <p className={styles.descr}>{item.descr}</p>
                </div>
              </a>
              <div className={styles.line} style={{ display: index == 4 ? "none" : "block" }} />
            </React.Fragment>
          );
        })}
        <button className={styles.button}>Все Новости</button>
      </div>
    );
  }

  const [firstStateMenu, setFirstStateMenu] = useState(false);
  const [secondStateMenu, setSecondStateMenu] = useState(false);
  return (
    <section className={styles.news}>
      <div className={styles.container}>
        <h3 className={styles.h3}>Новости</h3>
        <NewsTiles />
        <SecondMenu firstStateMenu={firstStateMenu} setFirstStateMenu={setFirstStateMenu} secondMenu={data.mainPage.secondMenu} />
        <ThirdMenu secondStateMenu={secondStateMenu} setSecondStateMenu={setSecondStateMenu} thirdMenu={data.mainPage.thirdMenu} />

        <div className={styles.links}>
          <a href="">
            <img src="./assets/icons/pdd.jpg" alt="" />
          </a>
          <a href="">
            <img src="./assets/icons/mnvorf.svg" alt="" />
          </a>
          <a href="">
            <img src="./assets/icons/mo.png" alt="" />
          </a>
          <a href="">
            <img src="./assets/icons/img.jpg" alt="" />
          </a>
          <a href="">
            <img src="./assets/icons/td.png" alt="" />
          </a>
          <a href="">
            <img src="./assets/icons/ceil.jpg" alt="" />
          </a>
          <a href="">
            <img src="./assets/icons/oatk.png" alt="" />
          </a>
          <div className={styles.social_links}>
            <a href="">
              <img src="./assets/icons/o.jpg" alt="" />
            </a>
            <a href="">
              <img src="./assets/icons/vk.jpg" alt="" />
            </a>
            <a href="">
              <img src="./assets/icons/rutube.jpg" alt="" />
            </a>
            <a href="">
              <img src="./assets/icons/yt.jpg" alt="" />
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
        <p style={{ color: firstStateMenu ? "#0540f2" : "#000000" }}>{secondMenu.title}</p>

        <button
          onClick={() => (firstStateMenu ? setFirstStateMenu(false) : setFirstStateMenu(true))}
          style={{ rotate: firstStateMenu ? "180deg" : "0deg" }}
        >
          <img src="./assets/icons/arrow.svg" alt="" />
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
        <p style={{ color: secondStateMenu ? "#0540f2" : "#000000" }}>{thirdMenu.title}</p>

        <button
          onClick={() => (secondStateMenu ? setSecondStateMenu(false) : setSecondStateMenu(true))}
          style={{ rotate: secondStateMenu ? "180deg" : "0deg" }}
        >
          <img src="./assets/icons/arrow.svg" alt="" />
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

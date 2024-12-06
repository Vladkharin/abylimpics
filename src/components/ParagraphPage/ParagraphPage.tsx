import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { DATA, PARAGRAPHS } from "../../App";
import { Header } from "./header/Header";
import styles from "./ParagraphPage.module.css";
import { Footer } from "./footer/Footer";

export function ParagraphPage() {
  const location = useLocation();

  const [data, setData] = useState<DATA>();
  const [activeTab, setActiveTab] = useState(0);
  const [activeParagraph, setActiveParagraph] = useState<PARAGRAPHS>();

  console.log(location);
  async function f() {
    const response = await fetch("./data/data.json");
    const data: DATA = await response.json();

    return data;
  }

  async function changeState() {
    const data = await f();

    setData(data);

    setActiveParagraph(data.paragraphs.filter((item) => item.name == location.pathname));
  }

  useEffect(() => {
    changeState();
  }, []);

  if (!data) {
    return;
  }

  return (
    <>
      <Header data={data} />
      <MenuParagraps />
      <ContetnTabs />
      <Footer />
    </>
  );

  function MenuParagraps() {
    if (!activeParagraph) {
      return;
    }
    return (
      <section className={styles.menu}>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            {activeParagraph[0].subparagraphs.map((item, index) => (
              <React.Fragment key={index}>
                <button onClick={() => setActiveTab(index)} className={`${styles.button} ${activeTab == index ? styles.underline : ""}`}>
                  {item.title}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
    );
  }

  function ContetnTabs() {
    if (!activeParagraph) {
      return;
    }
    return (
      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.content_wrapper}>
            {activeParagraph[0].subparagraphs[activeTab].content.map((item, index) => {
              const arr = item.split(".");
              let url = "";
              if (
                arr[arr.length - 1] == "doc" ||
                arr[arr.length - 1] == "docx" ||
                arr[arr.length - 1] == "xls" ||
                arr[arr.length - 1] == "xlsx"
              ) {
                url = "./assets/docs/";
                return (
                  <a className={styles.text} key={index} href={url + item}>
                    {index + 1}. {item.split(".")[0]}
                  </a>
                );
              } else if (arr[arr.length - 1] == "pdf") {
                url = "./assets/pdf/";

                return (
                  <a className={styles.text} key={index} href={url + item}>
                    {index + 1}. {item.split(".")[0]}
                  </a>
                );
              } else if (arr[0].indexOf("https") != -1) {
                return (
                  <a className={styles.text} key={index} href={item}>
                    {index + 1}. {item}
                  </a>
                );
              } else {
                const arr1 = item.split(":");

                if (arr1.length > 1) {
                  return arr1.map((item, index) => (
                    <div className={styles.text} key={index} style={{ marginTop: index == 0 ? "15px" : "0" }}>
                      {item}
                      {index == 0 ? ":" : ""}
                    </div>
                  ));
                }
              }
            })}
          </div>
        </div>
      </section>
    );
  }
}

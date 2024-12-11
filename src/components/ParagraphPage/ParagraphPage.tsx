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

  async function f() {
    const response = await fetch("./data/data.json");
    const data: DATA = await response.json();

    return data;
  }

  async function changeState() {
    const data = await f();

    setData(data);

    setActiveParagraph(data.paragraphs.filter((car) => car.name == location.pathname));
  }

  useEffect(() => {
    changeState();
  }, []);

  if (!data) {
    return;
  }

  return (
    <>
      <Header data={data} setActiveParagraph={setActiveParagraph} setActiveTab={setActiveTab} />
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
              let url = "";

              switch (item.type) {
                case "doc":
                  url = "./assets/docs/";
                  return (
                    <a className={styles.text} key={index} href={url + item.link}>
                      {index + 1}. {item.name}
                    </a>
                  );

                case "pdf":
                  url = "./assets/pdf/";
                  return (
                    <React.Fragment key={index}>
                      <div className={styles.text}>
                        {index + 1}. {item.name}
                      </div>
                      <iframe src={url + item.link} height={800} width={"100%"}></iframe>
                    </React.Fragment>
                  );
                case "link":
                  return (
                    <a className={styles.text} key={index} href={item.link}>
                      {index + 1}. {item.name}
                    </a>
                  );

                case "text":
                  return item.name.split(":").map((item, index) => (
                    <div className={styles.text} key={index} style={{ marginTop: index == 0 ? "15px" : "0" }}>
                      {item}
                      {index == 0 ? ":" : ""}
                    </div>
                  ));
                case "folder":
                  return item.links?.map((item, index) => (
                    <div className={styles.text} key={index}>
                      {index + 1}
                      {item.name}
                    </div>
                  ));
                default:
                  return;
              }
            })}
          </div>
        </div>
      </section>
    );
  }
}

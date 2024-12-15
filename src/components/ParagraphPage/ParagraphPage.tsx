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

  // function highlightedBlack(text: string) {
  //   return;
  // }

  // function highlightedBlue(text: string) {
  //   return <span color="#0540f2">{text}</span>;
  // }

  // function findAndEditHightedText(highlightedBlackArray: string[] = [], highlightedBlueArray: string[] = [], text: string) {
  //   const htmlCode = text;

  //   if (!highlightedBlackArray) {
  //     return <p>{htmlCode}</p>;
  //   }

  //   const element: JSX.Element[] = [];

  //   highlightedBlackArray.forEach((item, index) => {
  //     element.push(
  //       <p key={index} className={styles.texts}>
  //         {htmlCode.split(item)[0]}
  //         <span color="#0540f2">{item}</span>
  //         {htmlCode.split(item)[1]}
  //       </p>
  //     );
  //   });

  //   console.log(element);

  //   return element.join();
  // }

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
                        <a style={{ textDecoration: "none", color: "#000000" }} href={url + item.link}>
                          {index + 1}. {item.name}
                        </a>
                      </div>
                      <iframe className={styles.iframe} src={url + item.link}></iframe>
                    </React.Fragment>
                  );
                case "link":
                  return (
                    <a className={styles.text} key={index} href={item.link}>
                      {item.number ? index + 1 + "." : ""} {item.name}
                    </a>
                  );

                case "text":
                  return item.name.split(":").map((item, index) => (
                    <div className={styles.text} key={index} style={{ marginTop: index == 0 ? "15px" : "0" }}>
                      {item}
                      {index == 0 ? ":" : ""}
                    </div>
                  ));
                case "scroller":
                  url = "./assets/img/";
                  return (
                    <div key={index} className={styles.scroller}>
                      <div className={styles.text}>{item.name}</div>
                      {item.links?.map((car, index) => (
                        <img key={index} src={url + car} alt="img" />
                      ))}
                    </div>
                  );
                case "news":
                  return (
                    <React.Fragment key={index}>
                      <div className={styles.texts}>
                        <div className={styles.date}>{item.news?.date}</div>
                        <div className={styles.title}>{item.news?.title}</div>
                        {item.news?.subtitle?.map((car, index) => {
                          switch (car.type) {
                            case "text":
                              return (
                                <p key={index} className={styles.descr}>
                                  {car.name}
                                </p>
                              );

                            case "pdf":
                              url = "./assets/pdf/";
                              return (
                                <a target="_blank" key={index} href={url + car.link} className={styles.link_news}>
                                  {car.name}
                                </a>
                              );
                            case "link":
                              return (
                                <a target="_blank" key={index} href={car.link} className={styles.link_news}>
                                  {car.name}
                                </a>
                              );
                          }
                        })}
                      </div>
                    </React.Fragment>
                  );
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

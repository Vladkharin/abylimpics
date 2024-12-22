import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { DATA, NEWS, PARAGRAPHS } from "../../App";
import { Header } from "./header/Header";
import styles from "./ParagraphPage.module.css";
import { Footer } from "./footer/Footer";
import getImageSize from "image-size-from-url";

export function ParagraphPage({
  voiceHelperState,
  setVoiceHelperState,
}: {
  voiceHelperState: boolean;
  setVoiceHelperState: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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
      <Header
        data={data}
        setActiveParagraph={setActiveParagraph}
        setActiveTab={setActiveTab}
        voiceHelperState={voiceHelperState}
        setVoiceHelperState={setVoiceHelperState}
      />
      <MenuParagraps />
      <ContetnTabs activeParagraph={activeParagraph} activeTab={activeTab} />
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
}

function ImageComponent({ url }: { url: string }) {
  const [size, setSize] = useState("");

  useEffect(() => {
    xxx();
  }, []);

  async function getImageData() {
    const { width, height } = await getImageSize(url);

    if (width >= height) {
      return "gor";
    } else {
      return "vert";
    }
  }

  async function xxx() {
    const state = await getImageData();

    setSize(state);
  }

  return (
    <div style={{ width: "1180px", height: "800px", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <img className={size == "vert" ? styles.vert : styles.gor} src={url} alt="img" />
    </div>
  );
}

function Scroller({ news }: { news: NEWS | undefined }) {
  const [countImgs, setCountImgs] = useState<number>(0);
  const [activeImg, setActiveImg] = useState(0);
  const url = "./assets/docs/";

  return (
    <div className={styles.carousel}>
      <div style={{ width: `${countImgs * 1180}` + "px", transform: `translateX(-${activeImg * 1180}px)` }} className={styles.inner}>
        {news?.subtitle?.map((item) => {
          if (item.type == "scroller") {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useEffect(() => {
              if (!item.links) {
                return;
              }

              setCountImgs(item.links.length);
            }, []);

            const arr = item.links?.map((car) => {
              return <ImageComponent url={url + car} />;
            });

            return arr;
          }
        })}
      </div>
      <button
        onClick={() => {
          if (activeImg >= countImgs - 1) {
            setActiveImg(0);
          } else {
            setActiveImg(activeImg + 1);
          }
        }}
        className={styles.right}
      >
        {" "}
        &gt;{" "}
      </button>
      <button
        onClick={() => {
          if (activeImg <= 0) {
            setActiveImg(countImgs - 1);
          } else {
            setActiveImg(activeImg - 1);
          }
        }}
        className={styles.left}
      >
        {" "}
        &lt;{" "}
      </button>
    </div>
  );
}

export function ContetnTabs({ activeParagraph, activeTab }: { activeParagraph: PARAGRAPHS | undefined; activeTab: number }) {
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
                url = "./assets/docs/";
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
                    {index + 1 + ". "} {item.name}
                  </a>
                );

              case "text":
                return (
                  <p key={index} className={styles.text}>
                    {item.name}
                  </p>
                );

              case "scroller":
                url = "./assets/docs/";
                return (
                  <div key={index} className={styles.scroller}>
                    <div className={styles.text}>
                      {index + 1 + ". "}
                      {item.name}
                    </div>
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
                            url = "./assets/docs/";
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
                          case "doc":
                            url = "./assets/docs/";
                            return (
                              <a target="_blank" key={index} href={url + car.link} className={styles.link_news}>
                                {car.name}
                              </a>
                            );
                          case "scroller": {
                            url = "./assets/docs/";
                            return <Scroller news={item.news} />;
                          }

                          case "video": {
                            return (
                              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "50px 0" }}>
                                <iframe src={car.link} width={"400px"} height={"400px"}></iframe>
                              </div>
                            );
                          }
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

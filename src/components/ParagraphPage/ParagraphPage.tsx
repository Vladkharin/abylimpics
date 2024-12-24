import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { CONTENT, DATA, NEWS, PARAGRAPHS, voiceHelper } from "../../App";
import { Header } from "./header/Header";
import styles from "./ParagraphPage.module.css";
// import { Footer } from "./footer/Footer";
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
      <ContetnTabs activeParagraph={activeParagraph} activeTab={activeTab} voiceHelperState={voiceHelperState} data={data} />
      {/* <Footer voiceHelperState={voiceHelperState} /> */}
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
                <button
                  onMouseEnter={(event) => voiceHelper(event, voiceHelperState)}
                  onClick={() => setActiveTab(index)}
                  className={`${styles.button} ${activeTab == index ? styles.underline : ""}`}
                >
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

function ImageComponent({ url, voiceHelperState, index }: { url: string; voiceHelperState: boolean; index: number }) {
  const [size, setSize] = useState("");

  useEffect(() => {
    editState();
  });

  async function getImageData() {
    const { width, height } = await getImageSize(url);

    if (width >= height) {
      return "gor";
    } else {
      return "vert";
    }
  }

  async function editState() {
    const state = await getImageData();

    setSize(state);
  }

  return (
    <div key={index} style={{ width: "1180px", height: "800px", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <img
        onMouseEnter={(event) => voiceHelper(event, voiceHelperState)}
        className={size == "vert" ? styles.vert : styles.gor}
        src={url}
        alt="Фото"
      />
    </div>
  );
}

function Scroller({ news, voiceHelperState, index }: { news: NEWS | undefined; voiceHelperState: boolean; index: number }) {
  const [countImgs, setCountImgs] = useState<number>(0);
  const [activeImg, setActiveImg] = useState(0);
  const url = "./docs/";

  return (
    <div key={index} className={styles.carousel}>
      <div style={{ width: `${countImgs * 1180}` + "px", transform: `translateX(-${activeImg * 1180}px)` }} className={styles.inner}>
        {news?.subtitle?.map((item) => {
          if (item.type == "scroller") {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useEffect(() => {
              if (!item.links) {
                return;
              }

              setCountImgs(item.links.length);
            });

            const arr = item.links?.map((car, index) => {
              return <ImageComponent url={url + car} voiceHelperState={voiceHelperState} index={index} />;
            });

            return arr;
          }
        })}
      </div>
      <button
        onMouseEnter={(event) => voiceHelper(event, voiceHelperState)}
        onClick={() => {
          if (activeImg >= countImgs - 1) {
            setActiveImg(0);
          } else {
            setActiveImg(activeImg + 1);
          }
        }}
        className={styles.right}
        style={{ display: countImgs == 1 ? "none" : "block" }}
      >
        {" "}
        &gt;{" "}
      </button>
      <button
        onMouseEnter={(event) => voiceHelper(event, voiceHelperState)}
        onClick={() => {
          if (activeImg <= 0) {
            setActiveImg(countImgs - 1);
          } else {
            setActiveImg(activeImg - 1);
          }
        }}
        className={styles.left}
        style={{ display: countImgs == 1 ? "none" : "block" }}
      >
        {" "}
        &lt;{" "}
      </button>
    </div>
  );
}

function Gallery({ data }: { data: DATA }) {
  const newsParagraph = data.paragraphs.filter((item) => item.name == "/News");

  const arr: string[] = [];

  newsParagraph[0].subparagraphs.forEach((item) => {
    item.content.forEach((car) => {
      car.news?.subtitle?.forEach((subtitle) => {
        if (subtitle.type == "scroller") {
          subtitle.links?.forEach((img) => {
            arr.push(img);
          });
        }
      });
    });
  });

  return (
    <div className={styles.gallery_wrapper}>
      {arr.map((item, index) => (
        <img style={{ maxWidth: "100%" }} key={index} src={`./docs/${item}`} alt="Фото" />
      ))}
    </div>
  );
}

export function ContetnTabs({
  activeParagraph,
  activeTab,
  voiceHelperState,
  data,
}: {
  activeParagraph: PARAGRAPHS | undefined;
  activeTab: number;
  voiceHelperState: boolean;
  data: DATA;
}) {
  if (!activeParagraph) {
    return;
  }

  if (activeParagraph[0].name == "/Gallery") {
    return (
      <section className={styles.content}>
        <div className={styles.container}>
          {" "}
          <Gallery data={data} />
        </div>
      </section>
    );
  }
  let sortContent = activeParagraph[0].subparagraphs[activeTab].content;

  if (activeParagraph[0].name == "/News") {
    sortContent = activeParagraph[0].subparagraphs[activeTab].content.sort(compare);
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
  return (
    <section className={styles.content}>
      <div className={styles.container}>
        <div className={styles.content_wrapper}>
          {sortContent.map((item, index) => {
            let url = "";

            switch (item.type) {
              case "doc":
                url = "./docs/";
                return (
                  <a
                    onMouseEnter={(event) => voiceHelper(event, voiceHelperState)}
                    className={styles.text}
                    key={index}
                    href={url + item.link}
                  >
                    {item.name}
                  </a>
                );

              case "pdf":
                url = "./docs/";
                return (
                  <React.Fragment key={index}>
                    <div className={styles.text}>
                      <a
                        onMouseEnter={(event) => voiceHelper(event, voiceHelperState)}
                        style={{ textDecoration: "none", color: "#000000" }}
                        href={url + item.link}
                      >
                        {item.name}
                      </a>
                    </div>
                    <iframe className={styles.iframe} src={url + item.link}></iframe>
                  </React.Fragment>
                );
              case "link":
                return (
                  <a className={styles.text} key={index} href={item.link}>
                    {item.name}
                  </a>
                );

              case "text":
                return (
                  <p onMouseEnter={(event) => voiceHelper(event, voiceHelperState)} key={index} className={styles.text}>
                    {item.name}
                  </p>
                );

              case "scroller":
                url = "./docs/";
                return (
                  <div key={index} className={styles.scroller}>
                    <div className={styles.text}>{item.name}</div>
                    {item.links?.map((car, index) => (
                      <img onMouseEnter={(event) => voiceHelper(event, voiceHelperState)} key={index} src={url + car} alt="Фото" />
                    ))}
                  </div>
                );
              case "news":
                return (
                  <React.Fragment key={index}>
                    <div className={styles.texts}>
                      <div onMouseEnter={(event) => voiceHelper(event, voiceHelperState)} className={styles.date}>
                        {item.news?.date}
                      </div>
                      <div onMouseEnter={(event) => voiceHelper(event, voiceHelperState)} className={styles.title}>
                        {item.news?.title}
                      </div>
                      {item.news?.subtitle?.map((car, index) => {
                        switch (car.type) {
                          case "text":
                            return (
                              <p onMouseEnter={(event) => voiceHelper(event, voiceHelperState)} key={index} className={styles.descr}>
                                {car.name}
                              </p>
                            );

                          case "pdf":
                            url = "./docs/";
                            return (
                              <a
                                onMouseEnter={(event) => voiceHelper(event, voiceHelperState)}
                                target="_blank"
                                key={index}
                                href={url + car.link}
                                className={styles.link_news}
                              >
                                {car.name}
                              </a>
                            );
                          case "link":
                            return (
                              <a
                                onMouseEnter={(event) => voiceHelper(event, voiceHelperState)}
                                target="_blank"
                                key={index}
                                href={car.link}
                                className={styles.link_news}
                              >
                                {car.name}
                              </a>
                            );
                          case "doc":
                            url = "./docs/";
                            return (
                              <a
                                onMouseEnter={(event) => voiceHelper(event, voiceHelperState)}
                                target="_blank"
                                key={index}
                                href={url + car.link}
                                className={styles.link_news}
                              >
                                {car.name}
                              </a>
                            );
                          case "scroller": {
                            url = "./docs/";
                            return <Scroller news={item.news} voiceHelperState={voiceHelperState} index={index} />;
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

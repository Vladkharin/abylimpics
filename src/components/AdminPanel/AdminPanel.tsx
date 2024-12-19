import React, { useEffect, useState } from "react";
import { DATA, NEWS, TYPEFILE, SUBTITLE, CONTENT } from "../../App";
import styles from "./AdminPanel.module.css";
import { Authorization } from "./Authorization/Authorization";

const URLAPI = "./action.php";

export function AdminPanel() {
  const [auth, setAuth] = useState(false);
  const [buttonState, setButtonState] = useState("mainPage");
  const [paragraphsState, setParagraphsState] = useState("Basics");
  const [addFormState, setAddFormState] = useState(false);
  const [countInputs, setCountInputs] = useState(1);
  const [radioState, setRadioState] = useState("text");
  const [paragraphStateInForm, setParagraphStateInForm] = useState("");

  const [data, setData] = useState<DATA>();

  async function f() {
    const response = await fetch("./data/data.json");

    const data = await response.json();

    return data;
  }

  async function changeState() {
    const data = await f();

    setData(data);
  }

  useEffect(() => {
    changeState();
  }, []);

  if (!data) {
    return;
  }

  return (
    <section className={styles.adminPanel} style={{ height: auth ? "auto" : "100vh" }}>
      <Authorization auth={auth} setAuth={setAuth} />

      <div style={{ display: auth && !addFormState ? "block" : "none" }}>
        <div className={styles.button_wrapper}>
          <button onClick={() => setButtonState("mainPage")}> Главная страница</button>
          <button onClick={() => setButtonState("paragraphs")}> Пункты</button>
        </div>
        <div style={{ display: buttonState == "mainPage" ? "block" : "none" }}>
          <div>
            <div> Сертификаты </div>
            <div className={styles.cerificates_wrapper}>
              {data.mainPage.certificates.map((item, index) => (
                <div key={index}>
                  <img src={"./assets/img/" + item} alt="certificates" />
                  <form onSubmit={(event) => editFile(index, event, data, setData, buttonState, "certificates")}>
                    <button type="submit"> Удалить</button>
                  </form>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: buttonState == "paragraphs" ? "block" : "none" }}>
          <div>
            {data.mainPage.paragraphs.map((paragraph, index) => (
              <button key={index} onClick={() => setParagraphsState(paragraph.link)}>
                {paragraph.name}
              </button>
            ))}
          </div>
          <div>
            {data.paragraphs.map((item) => {
              if (item.name == "/" + paragraphsState) {
                return item.subparagraphs.map((car, index) => (
                  <React.Fragment key={index}>
                    <div style={{ fontSize: "40px", fontWeight: "500px" }}>{car.title}</div>
                    {car.content.map((el, indexEl) =>
                      el.type == "news" ? (
                        <News
                          content={el}
                          indexEl={indexEl}
                          data={data}
                          setData={setData}
                          buttonState={buttonState}
                          paragraphsState={paragraphsState}
                          index={index}
                        />
                      ) : (
                        <NotNews
                          content={el}
                          indexEl={indexEl}
                          data={data}
                          setData={setData}
                          buttonState={buttonState}
                          paragraphsState={paragraphsState}
                          index={index}
                        />
                      )
                    )}
                    <button
                      onClick={() => {
                        setAddFormState(true);
                        setParagraphStateInForm(car.title);
                      }}
                    >
                      Добавить
                    </button>
                  </React.Fragment>
                ));
              }
            })}
          </div>
        </div>
      </div>
      <div style={{ display: addFormState ? "block" : "none" }}>
        <button onClick={() => setAddFormState(false)}>Закрыть окно</button>
        <form onSubmit={(event) => editFile(0, event, data, setData, buttonState, "addNews", paragraphsState, 0, paragraphStateInForm)}>
          <div>
            <div>Добавляем в {paragraphStateInForm}</div>
            {data.typeContent.map((item, index) => (
              <div key={index}>
                <input
                  checked={radioState == item.name ? true : false}
                  onChange={() => setRadioState(item.name)}
                  type={"radio"}
                  name={"chooseType"}
                  value={item.name}
                  id={item.name}
                />
                <label htmlFor={item.name}>{item.title}</label>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <RenderSwitch name={radioState} countInputs={countInputs} setCountInputs={setCountInputs} />
          </div>
          <button type={"submit"}>Сохранить изменение</button>
        </form>
      </div>
    </section>
  );
}

function RenderSwitch({
  name,
  countInputs,
  setCountInputs,
}: {
  name: string;
  countInputs: number;
  setCountInputs: React.Dispatch<React.SetStateAction<number>>;
}) {
  switch (name) {
    case "text":
      return <TextInput />;
    case "news":
      return (
        <>
          <label>Заголовок Новости</label>
          <input type="text" name={"titleNews"} />
          <label>Дата</label>
          <input name={"date"} type="text" placeholder="01.01.2001" />
          {[...Array(countInputs)].map((_item, index) => (
            <NewsInput index={index} />
          ))}
          <button type={"button"} onClick={() => setCountInputs(countInputs + 1)}>
            Добавить еще один элемент
          </button>
        </>
      );
  }
}

function TextInput() {
  return (
    <>
      <label>Введите Текст</label>
      <textarea />
    </>
  );
}

function NewsInput(item: { index: number }) {
  const [radioNewsState, setRadioNewsState] = useState("link");
  return (
    <>
      <label>Выбрать тип</label>
      <label>Ссылка для перехода на другую страницу</label>
      <input
        checked={radioNewsState == "link" ? true : false}
        onChange={() => setRadioNewsState("link")}
        name={"chooseTypeNews" + `${item.index}`}
        value={"link"}
        type={"radio"}
      />
      <label>Документ для скачивания</label>
      <input
        checked={radioNewsState == "doc" ? true : false}
        onChange={() => setRadioNewsState("doc")}
        name={"chooseTypeNews" + `${item.index}`}
        value={"doc"}
        type={"radio"}
      />
      <label>Документ для показа на странице</label>
      <input
        checked={radioNewsState == "pdf" ? true : false}
        onChange={() => setRadioNewsState("pdf")}
        name={"chooseTypeNews" + `${item.index}`}
        value={"pdf"}
        type={"radio"}
      />
      <label>Текст</label>
      <input
        checked={radioNewsState == "text" ? true : false}
        onChange={() => setRadioNewsState("text")}
        name={"chooseTypeNews" + `${item.index}`}
        value={"text"}
        type={"radio"}
      />

      <RadioNews state={radioNewsState} />
    </>
  );
}

function RadioNews({ state }: { state: string }) {
  switch (state) {
    case "link":
      return (
        <>
          <label>Текст для ссылки</label>
          <input name={"name"} type={"text"} />
          <label>Сама ссылка</label>
          <input name={"link"} type={"text"} />
        </>
      );
    case "doc":
      return (
        <>
          <label>Текст для файла</label>
          <input name={"name"} type={"text"} />
          <label>Файл</label>
          <input name={"link"} type={"file"} />
        </>
      );
    case "pdf":
      return (
        <>
          <label>Текст для файла</label>
          <input name={"name"} type={"text"} />
          <label>Файл для вставки на страницу</label>
          <input name={"link"} type={"file"} />
        </>
      );
    case "text":
      return (
        <>
          <textarea name="text"></textarea>
        </>
      );
  }
}

function NotNews({
  content,
  indexEl,
  data,
  setData,
  buttonState,
  paragraphsState,
  index,
}: {
  content: {
    name: string;
    link?: string;
    links?: string[];
    type: TYPEFILE;
    number?: boolean;
    news?: NEWS;
  };
  indexEl: number;
  data: DATA;
  setData: React.Dispatch<React.SetStateAction<DATA | undefined>>;
  buttonState: string;
  paragraphsState: string;
  index: number;
}) {
  return (
    <form onSubmit={(event) => editFile(indexEl, event, data, setData, buttonState, "notNews", paragraphsState, index)} key={indexEl}>
      <div>{content.name}</div>
      <button type={"submit"}>Удалить</button>
    </form>
  );
}

function News({
  content,
  indexEl,
  data,
  setData,
  buttonState,
  paragraphsState,
  index,
}: {
  content: {
    name: string;
    link?: string;
    links?: string[];
    type: TYPEFILE;
    number?: boolean;
    news?: NEWS;
  };
  indexEl: number;
  data: DATA;
  setData: React.Dispatch<React.SetStateAction<DATA | undefined>>;
  buttonState: string;
  paragraphsState: string;
  index: number;
}) {
  return (
    <form onSubmit={(event) => editFile(indexEl, event, data, setData, buttonState, "News", paragraphsState, index)} key={indexEl}>
      <div>{content.news?.date}</div>
      <div>{content.news?.title}</div>
      {content.news?.subtitle?.map((car, index) => (
        <>
          <div key={index}>{car.name}</div>
        </>
      ))}
      <button type={"submit"}>Удалить Всю новость</button>
    </form>
  );
}

function editCertificates(data: DATA, index: number): DATA {
  return (data = {
    ...data,
    mainPage: {
      ...data.mainPage,
      certificates: data.mainPage.certificates.filter((el, indexEl) => indexEl != index && data.mainPage.certificates[index] != el),
    },
  });
}

function editNotNews(data: DATA, indexEl: number, paragraphsState: string, index: number): DATA {
  const othersElementsParagraph = data.paragraphs.filter((item) => item.name !== "/" + paragraphsState);
  const currentElementParagraph = data.paragraphs.filter((item) => item.name == "/" + paragraphsState)[0];
  const otherElementsAreSmallerThanThisOneSubparagraph = currentElementParagraph.subparagraphs.filter((_item, indexEl) => indexEl < index);
  const otherElementsAreBiggestThanThisOneSubparagraph = currentElementParagraph.subparagraphs.filter((_item, indexEl) => indexEl > index);
  const currentElementSubparagraph = currentElementParagraph.subparagraphs[index];
  const currentElementsContent = currentElementSubparagraph.content.filter((_item, index) => index != indexEl);

  return (data = {
    ...data,
    paragraphs: [
      ...othersElementsParagraph,
      {
        name: currentElementParagraph.name,
        subparagraphs: [
          ...otherElementsAreSmallerThanThisOneSubparagraph,
          {
            title: currentElementSubparagraph.title,
            name: currentElementSubparagraph.name,
            content: currentElementsContent,
          },
          ...otherElementsAreBiggestThanThisOneSubparagraph,
        ],
      },
    ],
  });
}

function editNews(data: DATA, indexEl: number, paragraphsState: string, index: number): DATA {
  const othersElementsParagraph = data.paragraphs.filter((item) => item.name !== "/" + paragraphsState);
  const currentElementParagraph = data.paragraphs.filter((item) => item.name == "/" + paragraphsState)[0];
  const otherElementsAreSmallerThanThisOneSubparagraph = currentElementParagraph.subparagraphs.filter((_item, indexEl) => indexEl < index);
  const otherElementsAreBiggestThanThisOneSubparagraph = currentElementParagraph.subparagraphs.filter((_item, indexEl) => indexEl > index);
  const currentElementSubparagraph = currentElementParagraph.subparagraphs[index];
  const currentElementsContent = currentElementSubparagraph.content.filter((_item, index) => index != indexEl);

  return (data = {
    ...data,
    paragraphs: [
      ...othersElementsParagraph,
      {
        name: currentElementParagraph.name,
        subparagraphs: [
          ...otherElementsAreSmallerThanThisOneSubparagraph,
          {
            title: currentElementSubparagraph.title,
            name: currentElementSubparagraph.name,
            content: currentElementsContent,
          },
          ...otherElementsAreBiggestThanThisOneSubparagraph,
        ],
      },
    ],
  });
}

function addNews(data: DATA, paragraphsState: string, titleSubparagraph: string, event: React.FormEvent<HTMLFormElement>) {
  const formDATA = new FormData(event.target as HTMLFormElement);

  const name = formDATA.get("titleNews")?.toString() as string;
  const type = formDATA.get("chooseType")?.toString() as TYPEFILE;
  const titleNews = formDATA.get("titleNews")?.toString() as string;
  const dateNews = formDATA.get("date")?.toString() as string;

  const obj: CONTENT = {
    name: name,
    type: type,
    news: {
      title: titleNews,
      date: dateNews,
      subtitle: [],
    },
  };

  formDATA.delete("titleNews");
  formDATA.delete("chooseType");
  formDATA.delete("date");

  const array: SUBTITLE[] = [];

  let objJs: any = {};

  let i = 0;
  let b = 0;
  let c = 0;

  formDATA.forEach((item) => {
    if (item) {
      b++;
    }
  });

  const arrayFile: string[] = [];

  formDATA.forEach(function (value, key) {
    c++;
    if (key.indexOf("chooseTypeNews") != -1) {
      if (key.indexOf("chooseTypeNews" + (i + 1).toString()) != -1) {
        array.push(objJs);
        objJs = {};
        i++;
      }
      objJs.type = value;
    }

    if (key == "name") {
      objJs.name = value;
    }

    if (key == "text") {
      objJs.name = value;
    }

    if (key == "link") {
      if (typeof value == "object") {
        objJs.link = value.name;
        arrayFile.push(value.name);
      } else {
        objJs.link = value;
      }
    }

    if (b == c) {
      array.push(objJs);
      objJs = {};
      i++;
    }
  });

  if (obj.news) {
    obj.news.subtitle = array;
  }

  const othersElementsParagraph = data.paragraphs.filter((item) => item.name !== "/" + paragraphsState);
  const currentElementParagraph = data.paragraphs.filter((item) => item.name == "/" + paragraphsState)[0];
  const index = currentElementParagraph.subparagraphs.findIndex((el) => el.title == titleSubparagraph);
  const otherElementsAreSmallerThanThisOneSubparagraph = currentElementParagraph.subparagraphs.filter((_item, indexEl) => indexEl < index);
  const otherElementsAreBiggestThanThisOneSubparagraph = currentElementParagraph.subparagraphs.filter((_item, indexEl) => indexEl > index);
  const currentElementSubparagraph = currentElementParagraph.subparagraphs[index];
  const othersElementsContent = currentElementSubparagraph.content;

  const returnData = {
    ...data,
    paragraphs: [
      ...othersElementsParagraph,
      {
        name: currentElementParagraph.name,
        subparagraphs: [
          ...otherElementsAreSmallerThanThisOneSubparagraph,
          {
            title: currentElementSubparagraph.title,
            name: currentElementSubparagraph.name,
            content: [...othersElementsContent, obj],
          },
          ...otherElementsAreBiggestThanThisOneSubparagraph,
        ],
      },
    ],
  };

  return [returnData, arrayFile];
}

async function editFile(
  indexEl: number,
  event: React.FormEvent<HTMLFormElement>,
  data: DATA,
  setData: React.Dispatch<React.SetStateAction<DATA | undefined>>,
  pageKey: string,
  paragraphKey: string,
  paragraphsState: string = "",
  index: number = 0,
  titleSubparagraph: string = ""
) {
  event.preventDefault();
  let dataEl: DATA | undefined;
  let files: string[] | undefined;

  switch (pageKey) {
    case "mainPage":
      switch (paragraphKey) {
        case "certificates":
          dataEl = editCertificates(data, indexEl);
          break;
        case "secondMenu":
          dataEl = editCertificates(data, indexEl);
          break;
      }
      break;
    case "paragraphs":
      switch (paragraphKey) {
        case "notNews":
          dataEl = editNotNews(data, indexEl, paragraphsState, index);
          break;
        case "News":
          dataEl = editNews(data, indexEl, paragraphsState, index);
          break;
        case "addNews": {
          const per = addNews(data, paragraphsState, titleSubparagraph, event);
          dataEl = per[0] as DATA;
          files = per[1] as string[];

          break;
        }
      }
  }

  if (!dataEl || (!files && paragraphKey == "addNews")) {
    return;
  }

  setData({ ...dataEl });

  console.log(dataEl);

  const formData = new FormData();

  formData.set("data", JSON.stringify(dataEl));

  formData.set("files", JSON.stringify(files));

  console.log(formData);

  const response = await fetch(URLAPI, {
    method: "POST",
    body: formData,
  });

  const dataRequest = await response.json();

  console.log(dataRequest);
}
